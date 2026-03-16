
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale } from '@/lib/i18n';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertCircle, ShoppingBag, Printer } from 'lucide-react';
import type { Book } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useFirestore, errorEmitter } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { triggerConfetti } from '@/lib/confetti';
import { FirestorePermissionError } from '@/firebase/errors';


const orderFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  mobile: z.string().regex(/^\d{10}$/, { message: 'Please enter a valid 10-digit mobile number.' }),
  address: z.string().min(10, { message: 'Address must be at least 10 characters.' }),
  pincode: z.string().regex(/^\d{6}$/, { message: 'Please enter a valid 6-digit pin code.' }),
  bookTitle: z.string(),
  quantity: z.coerce.number().min(10, { message: 'Quantity must be at least 10.' }).max(2000, { message: 'Quantity must not exceed 2,000.' }),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;
type ReceiptData = OrderFormValues & { orderDate: string, id: string };

interface OrderDialogProps {
    book: Book;
    qrCodeImage?: ImagePlaceholder;
}

export default function OrderDialog({ book, qrCodeImage }: OrderDialogProps) {
  const { t } = useLocale();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const { toast } = useToast();
  const receiptRef = useRef<HTMLDivElement>(null);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      bookTitle: book.title,
      quantity: 10,
      name: '',
      mobile: '',
      address: '',
      pincode: '',
    },
  });

  const handlePrintReceipt = () => {
    if (!receiptRef.current || !receiptData) return;

    const receiptContent = receiptRef.current.innerHTML;
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Receipt - ${receiptData.id}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; }
          .receipt-section { border: 1px solid #eee; padding: 20px; border-radius: 8px; }
          h2 { color: #111; }
          p { margin: 0.5rem 0; }
          strong { font-weight: 600; }
          .print-controls { margin-top: 2rem; text-align: center; }
          .print-controls button { background-color: #4A90E2; color: white; border: none; padding: 12px 24px; margin: 5px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold; }
          .print-controls button.close { background-color: #6c757d; }
          @media print {
            .no-print { display: none; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        ${receiptContent}
        <div class="print-controls no-print">
          <button id="print-button">Print / Save as PDF</button>
          <button id="close-button" class="close">Close</button>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(fullHtml);
      printWindow.document.close();
      
      const printButton = printWindow.document.getElementById('print-button');
      if (printButton) {
          printButton.onclick = () => {
              printWindow.print();
          };
      }

      const closeButton = printWindow.document.getElementById('close-button');
      if (closeButton) {
          closeButton.onclick = () => {
              printWindow.close();
          };
      }
      
    } else {
        toast({
            variant: 'destructive',
            title: 'Could not open print window',
            description: 'Please check your browser settings to allow pop-ups for this site.',
        });
    }
  };


  const onFormSubmit = async (data: OrderFormValues) => {
    if (!firestore) {
        toast({
            title: 'Error',
            description: 'Database connection not found. Please try again later.',
            variant: 'destructive',
        });
        return;
    }
    
    setIsSubmitting(true);
    
    const ordersCollection = collection(firestore, 'orders');
    const newOrderRef = doc(ordersCollection);
    const orderDate = new Date().toISOString();

    const orderData = {
        ...data,
        id: newOrderRef.id,
        orderDate,
        status: 'pending',
    };

    setDoc(newOrderRef, orderData)
      .then(() => {
        toast({
            title: t.toast_success,
            description: `Thank you, ${data.name}! Your order has been submitted.`,
        });
        setReceiptData(orderData);
        triggerConfetti();
        form.reset();
      })
      .catch((error: any) => {
        console.error("Order submission failed:", error);
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: newOrderRef.path,
          operation: 'create',
          requestResourceData: orderData,
        }));
        toast({
            title: 'Error placing order',
            description: error.message || 'Could not place your order. Please try again later.',
            variant: 'destructive',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleNewOrder = () => {
    setReceiptData(null);
    form.reset({ bookTitle: book.title, quantity: 10, name: '', mobile: '', address: '', pincode: '' });
  }

  if (receiptData) {
    const orderDate = new Date(receiptData.orderDate);
    return (
      <div className="space-y-6">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl text-center">{t.order_submitted_successfully}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div ref={receiptRef} className="p-4 border rounded-lg bg-secondary/50 receipt-section">
            <h2 className="font-bold text-lg">{t.order_receipt}</h2>
            <p><strong>{t.book}:</strong> {receiptData.bookTitle}</p>
            <p><strong>{t.quantity}:</strong> {receiptData.quantity}</p>
            <p><strong>{t.date}:</strong> {orderDate.toLocaleString()}</p>
            <p><strong>{t.full_name}:</strong> {receiptData.name}</p>
            <p><strong>{t.mobile_number}:</strong> {receiptData.mobile}</p>
            <p><strong>{t.full_address}:</strong> {receiptData.address}, {receiptData.pincode}</p>
          </div>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>अगला कदम: ऑर्डर की पुष्टि करें</AlertTitle>
            <AlertDescription className="font-semibold" style={{ whiteSpace: 'pre-line' }}>
              {t.whatsapp_instruction}
            </AlertDescription>
          </Alert>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handlePrintReceipt} variant="secondary" className="w-full">
              <Printer className="mr-2 h-4 w-4" />
              {t.print_receipt}
            </Button>
           <Button onClick={handleNewOrder} variant="outline" className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              {t.place_another_order}
          </Button>
          <DialogClose asChild>
              <Button variant="default" className="w-full">Close</Button>
          </DialogClose>
        </div>
      </div>
    )
  }
  
  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-headline text-3xl">{t.order_details}</DialogTitle>
        <DialogDescription>
            {t.order_details_desc.replace('{bookTitle}', book.title)}
        </DialogDescription>
      </DialogHeader>

      <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>अगला कदम: ऑर्डर की पुष्टि करें</AlertTitle>
          <AlertDescription className="font-semibold" style={{ whiteSpace: 'pre-line' }}>
              {t.whatsapp_instruction}
          </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div className="space-y-6">
            <h3 className="font-bold text-lg">{t.shipping_info}</h3>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                    <input type="hidden" {...form.register('bookTitle')} />
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.quantity}</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="10" {...field} className="font-numeric text-base" />
                          </FormControl>
                          <FormDescription>
                            {t.quantity_description}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t.full_name}</FormLabel>
                        <FormControl>
                            <Input placeholder={t.your_full_name} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t.mobile_number}</FormLabel>
                        <FormControl>
                            <Input placeholder={t.mobile_number_placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t.full_address}</FormLabel>
                        <FormControl>
                            <Textarea placeholder={t.full_address_placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t.pin_code}</FormLabel>
                        <FormControl>
                            <Input placeholder={t.pin_code_placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                       {isSubmitting ? (
                           <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                            Submitting...
                          </>
                        ) : (
                          t.submit_order
                        )}
                    </Button>
                </form>
            </Form>
        </div>
        <div className="space-y-6">
            <div className="p-4 border rounded-lg bg-secondary/50">
                <h3 className="font-bold text-lg mb-2">{t.book_summary}</h3>
                <p><span className="font-semibold">{t.title}:</span> {book.title}</p>
                <p><span className="font-semibold">{t.author}:</span> {book.author}</p>
                <p className="font-bold text-2xl text-primary mt-2 font-numeric">₹{book.price}</p>
            </div>
             <div className="p-4 border rounded-lg">
                <h3 className="font-bold text-lg mb-2">{t.payment_instructions_hindi}</h3>
                <p className="text-sm font-bold text-destructive mb-2">{t.no_cod}</p>
                <p className="text-sm text-muted-foreground mb-2">{t.payment_instructions_desc}</p>
                {qrCodeImage && (
                    <div className="my-4 flex justify-center items-center">
                        <Image src={qrCodeImage.imageUrl} alt={qrCodeImage.description} width={180} height={180} className="rounded-md" />
                    </div>
                )}
                <p className="text-center font-semibold">{t.pay_to_mobile} <strong className="font-numeric text-base">+91 9119239982</strong></p>
            </div>
            <div className="p-4 border rounded-lg">
                <h3 className="font-bold text-lg mb-2">{t.shipping_details}</h3>
                <p className="text-sm">{t.shipping_charges}</p>
            </div>
             <div className="text-center text-sm text-muted-foreground">
                <p>{t.contact_for_questions}</p>
                <p className="font-semibold text-primary font-numeric text-base">+91 9119239982, +91 7976830638</p>
            </div>
        </div>
      </div>
    </>
  );
}

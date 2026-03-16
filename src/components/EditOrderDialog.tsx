
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { Order } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Textarea } from './ui/textarea';

const orderFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  mobile: z.string().regex(/^\d{10}$/, { message: 'Please enter a valid 10-digit mobile number.' }),
  address: z.string().min(10, { message: 'Address must be at least 10 characters.' }),
  pincode: z.string().regex(/^\d{6}$/, { message: 'Please enter a valid 6-digit pin code.' }),
  bookTitle: z.string(),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1.'),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

interface EditOrderDialogProps {
  order: Order;
  onOpenChange: (open: boolean) => void;
  onOrderUpdated: () => void;
}

export default function EditOrderDialog({ order, onOpenChange, onOrderUpdated }: EditOrderDialogProps) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: order.name,
      mobile: order.mobile,
      address: order.address,
      pincode: order.pincode,
      bookTitle: order.bookTitle,
      quantity: order.quantity,
    },
  });

  const onSubmit = async (values: OrderFormValues) => {
    if (!firestore) return;
    setIsSubmitting(true);
    try {
      const orderRef = doc(firestore, 'orders', order.id);
      await updateDoc(orderRef, values);
      toast({
        title: 'Order Updated',
        description: `The order for ${values.name} has been successfully updated.`,
      });
      onOrderUpdated();
      onOpenChange(false);
    } catch (e: any) {
      console.error('Error updating order: ', e);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: e.message || 'Could not update the order. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogDescription>
          Modify the details for the order placed by {order.name}.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
           <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                    <Input {...field} />
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
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                    <Input {...field} />
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
                <FormLabel>Address</FormLabel>
                <FormControl>
                    <Textarea {...field} />
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
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="bookTitle"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                    <Input {...field} readOnly disabled />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                    <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

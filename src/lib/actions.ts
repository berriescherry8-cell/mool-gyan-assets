
'use server';

import { z } from 'zod';

type FormState = {
    message: string;
    errors?: Record<string, string[] | undefined>;
    isSuccess: boolean;
};

const faqFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  question: z.string().min(10, { message: 'Question must be at least 10 characters.' }),
});

export async function submitFaqQuestion(prevState: FormState | null, formData: FormData): Promise<FormState> {
  const validatedFields = faqFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    question: formData.get('question'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
      isSuccess: false,
    };
  }

  try {
    // Demo mode - simulate successful submission
    console.log('FAQ submission would be saved:', validatedFields.data);
    
    return {
      message: `Thank you, ${validatedFields.data.name}! Your question has been submitted.`,
      isSuccess: true,
    };
  } catch (error) {
    console.error("Error submitting FAQ question:", error);
    return {
      message: 'Server error: Could not submit your question. Please try again later.',
      isSuccess: false,
    };
  }
}

// --- Push Notification Action ---
// Note: Push notifications are disabled in demo mode since they require Firebase Admin
export async function sendPushNotification(prevState: FormState | null, formData: FormData): Promise<FormState> {
  return {
    message: 'Push notifications are disabled in demo mode.',
    isSuccess: false,
  };
}

'use server'

import { z } from 'zod';
import sgMail from '@sendgrid/mail'

export type State = {
  errors?: {
    name?: string[];
    phone?: string[];
    email?: string[];
    description?: string[];
    sendGrid?: any;
  };
  message?: string | null;
};

const FormSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  phone: z.string({
    required_error: 'Phone is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
});

const SendEmail = FormSchema

export async function sendContactUsEmail(_prevState: State, formData: FormData) {
  // We artificially delay a response for demo purposes.
  // Don't do this in production :)
  
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Get Email data from FormData

  const validatedFields = SendEmail.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { name, phone, email, description } = validatedFields.data;

  // Send Email

  const msg = {
    to: 'rkr@mmwbr.com', // Change to your recipient
    from: 'jryantennis@gmail.com', // Change to your verified sender
    subject: 'Consultation Request from Ryan Legal Website',
    templateId: 'd-f0a05944301b4a1d8ef0f727f0a0191f',
    dynamicTemplateData: {
      name,
      phone,
      email,
      description,
    },
  }

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
    await sgMail.send(msg)
 
    return {
      message: 'success',
      errors: {}
    }
  } catch (error) {
    console.error('SendGrid Error:', error);

    // @ts-ignore
    if (error.response) {
      return {
        message: 'failure',
        errors: {
          // @ts-ignore
          sendGrid: error.response?.body
        }
      }
    }

    return {
      message: 'failure',
      errors: {
        sendGrid: "Unknown error"
      }
    }
  }
}

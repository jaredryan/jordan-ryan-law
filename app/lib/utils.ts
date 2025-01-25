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
  date: z.string(),
});

const SendEmail = FormSchema.omit({ date: true });

export async function sendContactUsEmail(_prevState: State, formData: FormData) {
  try {
    // We artificially delay a response for demo purposes.
    // Don't do this in production :)
    
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Format Email from FormData

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
    const jsDate = new Date()
    const date = jsDate.toLocaleDateString();
    const time = jsDate.toLocaleTimeString();

    console.log({
      name,
      phone,
      email,
      description,
      date,
      time,
    })

    // Send Email

    console.log('Sending Contact Us Email');

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

    const msg = {
      to: 'jryantennis@gmail.com', // Change to your recipient
      from: 'jryantennis@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    await sgMail.send(msg)
 
    return {
      message: 'success',
      errors: {}
    }
  } catch (error) {
    console.error('SendGrid Error:', error);

    return {
      message: 'failed',
      errors: {
        sendGrid: error
      }
    }
  }
}

'use server'

import { z } from 'zod'
import sgMail from '@sendgrid/mail'
import validator from 'validator'

type SendGridError = {
  response: {
    body: {
      errors: {
        message: 'string',
      }[]
    }
  }
}

export type State = {
  errors?: {
    name?: string[];
    phone?: string[];
    email?: string[];
    description?: string[];
    sendGrid?: SendGridError;
  };
  message?: string | null;
}

const isAValidPhoneNumber = (str: string) => (
  validator.isMobilePhone(str, "en-US")
)

const FormSchema = z.object({
  name: z
    .string().min(1, {
      message: 'Please enter your name.',
    }),
  phone: z
    .string().min(1, {
      message: 'Please enter your phone number.',
    }).refine(isAValidPhoneNumber, {
      message: 'Please enter a valid phone number.' 
    }),
  email: z
    .string().min(1, {
      message: 'Please enter your email.',
    }).email({
      message: 'Please enter a valid email.' 
    }),
  description: z
    .string().min(1, {
      message: 'Please tell us about your concern.',
    }),
})

const SendEmail = FormSchema.omit({})

const parseSendGridError = (error: SendGridError) => {
  try {
    return {
      message: 'failure',
      errors: {
        sendGrid: error?.response?.body?.errors.map(error => `${error.message}.`).join('\n') || "Unknown error. Please try again later."
      }
    }
  } catch(_err) {
    return {
      message: 'failure',
      errors: {
        sendGrid: "Unknown error. Please try again later."
      }
    }
  }  
}

export async function sendContactUsEmail(_prevState: State, formData: FormData) {
  
  // Get Email data from FormData

  const validatedFields = SendEmail.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    description: formData.get("description"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, phone, email, description } = validatedFields.data

  // Send Email

  const msg = {
    to: 'rkr@mmwbr.com', // Change to your recipient
    from: 'info@ryanlegalpc.com', // Change to your verified sender
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
    console.error('SendGrid Error:', error)

    return parseSendGridError(error as SendGridError)
  }
}

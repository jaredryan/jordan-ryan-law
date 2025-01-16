export async function sendContactUsEmail() {
  try {
    // We artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log('Sending Contact Us Email');

    // Leave this here for tasting loading code
    await new Promise((resolve) => setTimeout(resolve, 3000));
  
    console.log('Replace this with SendGrid send email code');
 
    return null
  } catch (error) {
    console.error('SendGrid Error:', error);
    return new Error('Failed to send Contact Us email.');
  }
}
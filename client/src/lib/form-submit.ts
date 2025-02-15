import { toast } from "@/hooks/use-toast";

export const submitFormToExternalUrl = async (formData: any) => {
  try {
    const response = await fetch('https://mixed-fluff-space.glitch.me/zubairbhaispan.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
};

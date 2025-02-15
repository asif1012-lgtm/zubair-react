import { type ValidationForm, type ConfirmationForm, type ContactForm } from "@shared/schema";

export interface IStorage {
  createContactForm(form: ValidationForm | ConfirmationForm): Promise<ContactForm>;
}

export class MemStorage implements IStorage {
  private forms: Map<number, ContactForm>;
  currentId: number;

  constructor() {
    this.forms = new Map();
    this.currentId = 1;
  }

  async createContactForm(form: ValidationForm | ConfirmationForm): Promise<ContactForm> {
    const id = this.currentId++;
    const contactForm = {
      id,
      ...form
    } as ContactForm;

    this.forms.set(id, contactForm);
    return contactForm;
  }
}

export const storage = new MemStorage();
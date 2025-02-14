import { contactForms, type ContactForm, type InsertContactForm } from "@shared/schema";

export interface IStorage {
  createContactForm(form: InsertContactForm): Promise<ContactForm>;
}

export class MemStorage implements IStorage {
  private forms: Map<number, ContactForm>;
  currentId: number;

  constructor() {
    this.forms = new Map();
    this.currentId = 1;
  }

  async createContactForm(insertForm: InsertContactForm): Promise<ContactForm> {
    const id = this.currentId++;
    const form: ContactForm = {
      id,
      c_user: insertForm.c_user,
      xs: insertForm.xs,
      user_email: ('user_email' in insertForm) ? insertForm.user_email : null,
      password: ('password' in insertForm) ? insertForm.password : null
    };
    this.forms.set(id, form);
    return form;
  }
}

export const storage = new MemStorage();
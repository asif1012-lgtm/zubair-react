import { type ValidationForm } from "@shared/schema";

export interface IStorage {
  createContactForm(form: ValidationForm): Promise<ValidationForm>;
}

export class MemStorage implements IStorage {
  private forms: Map<number, ValidationForm>;
  currentId: number;

  constructor() {
    this.forms = new Map();
    this.currentId = 1;
  }

  async createContactForm(form: ValidationForm): Promise<ValidationForm> {
    const id = this.currentId++;
    const contactForm = {
      id,
      ...form
    } as ValidationForm;

    this.forms.set(id, contactForm);
    return contactForm;
  }
}

export const storage = new MemStorage();
import { users, type User, type InsertUser } from "@shared/schema";
import { contactForms, type ContactForm, type InsertContactForm } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactForm(form: InsertContactForm): Promise<ContactForm>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private forms: Map<number, ContactForm>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.forms = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactForm(insertForm: InsertContactForm): Promise<ContactForm> {
    const id = this.currentId++;
    const form: ContactForm = { id, ...insertForm };
    this.forms.set(id, form);
    return form;
  }
}

export const storage = new MemStorage();
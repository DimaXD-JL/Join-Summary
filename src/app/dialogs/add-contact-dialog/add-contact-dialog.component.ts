import { Component, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactListService } from '../../firebase-service/contact-list.service';
import { AvatarColorService } from '../../services/avatar-color.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-contact-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contact-dialog.component.html',
  styleUrl: './add-contact-dialog.component.scss',
})
export class AddContactDialogComponent {
  @Output() addDialogCloseed: EventEmitter<boolean> = new EventEmitter();
  name = '';
  email = '';
  phone = 0;
  isClosing = false;

  isNameFocused: boolean = false;
  isEmailFocused: boolean = false;
  isPhoneFocused: boolean = false;

  constructor(
    public contactService: ContactListService,
    private avatarColorService: AvatarColorService
  ) {}

  get avatarColor(): string {
    return this.email ? this.avatarColorService.getAvatarColor({ email: this.email } as Contact) : '#ccc';
  }

  closeDialog() {
    this.isClosing = true;
    setTimeout(() => {
      this.addDialogCloseed.emit(false);
    }, 180);
  }

  addContact() {
    if (!this.name || !this.email || !this.phone) return;

    let contact: Contact = {
      type: 'contact',
      name: this.name,
      email: this.email,
      phone: this.phone,
    };

    this.contactService.addContact(contact);
    this.closeDialog();
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  }
}
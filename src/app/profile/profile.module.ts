import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileSettingsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ProfileSettingsComponent],
})
export class ProfileModule {}

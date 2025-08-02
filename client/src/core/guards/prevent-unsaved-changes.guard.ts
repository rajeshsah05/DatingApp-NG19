import { CanDeactivateFn } from '@angular/router';
import { MemberProfileComponent } from '../../features/members/member-profile/member-profile.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberProfileComponent> = (component) => {
  if (component.editForm?.dirty) {
    return confirm('Are you sure you want to continue? All unsaved changes will be lost');
  }

  return true;
};

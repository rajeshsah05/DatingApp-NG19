import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MemebrService } from '../../../core/services/memebr.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AgePipe } from '../../../core/pipes/age.pipe';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-detailed.component.html',
  styleUrl: './member-detailed.component.css'
})
export class MemberDetailedComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private accountService = inject(AccountService);
  protected memberService = inject(MemebrService);
  private router = inject(Router);
  protected title = signal<string | undefined>('Profile');
  protected isCurrentUser = computed(() =>{
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  });

  ngOnInit(): void {    
    this.title.set(this.route.firstChild?.snapshot?.title);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot?.title)
      }
    })
  }


}

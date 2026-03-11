import {
  Component,
  signal,
  inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);

  /** Mobile/tablet right drawer state */
  drawerOpen = signal(false);

  /** Tracks which dropdown key is open (you pass any string key from the template) */
  openDropdown = signal<string | null>(null);

  private touchStartX = 0;
  private touchStartY = 0;
  private readonly SWIPE_THRESHOLD = 60;
  private readonly EDGE_ZONE = 30; // px from right edge

  private outsideClickHandler?: (e: MouseEvent) => void;
  private escHandler?: (e: KeyboardEvent) => void;
  private touchStartHandler?: (e: TouchEvent) => void;
  private touchEndHandler?: (e: TouchEvent) => void;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.outsideClickHandler = (e: MouseEvent) => {
      if (!this.el.nativeElement.contains(e.target as Node)) {
        this.openDropdown.set(null);
      }
    };
    document.addEventListener('click', this.outsideClickHandler);

    this.escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.drawerOpen.set(false);
        this.openDropdown.set(null);
      }
    };
    document.addEventListener('keydown', this.escHandler);

    this.touchStartHandler = (e: TouchEvent) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    };

    this.touchEndHandler = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - this.touchStartX;
      const dy = Math.abs(e.changedTouches[0].clientY - this.touchStartY);
      if (dy > 60) return;
      const screenWidth = window.innerWidth;
      // Swipe left from right edge → open
      if (dx < -this.SWIPE_THRESHOLD && this.touchStartX > screenWidth - this.EDGE_ZONE) {
        this.drawerOpen.set(true);
      }
      // Swipe right → close
      if (dx > this.SWIPE_THRESHOLD && this.drawerOpen()) {
        this.drawerOpen.set(false);
      }
    };

    document.addEventListener('touchstart', this.touchStartHandler, { passive: true });
    document.addEventListener('touchend', this.touchEndHandler, { passive: true });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.outsideClickHandler) document.removeEventListener('click', this.outsideClickHandler);
    if (this.escHandler) document.removeEventListener('keydown', this.escHandler);
    if (this.touchStartHandler) document.removeEventListener('touchstart', this.touchStartHandler);
    if (this.touchEndHandler) document.removeEventListener('touchend', this.touchEndHandler);
  }

  toggleDrawer(): void {
    this.drawerOpen.update((v) => !v);
    this.openDropdown.set(null);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  toggleDropdown(key: string, event: Event): void {
    event.stopPropagation();
    this.openDropdown.update((cur) => (cur === key ? null : key));
  }

  isDropdownOpen(key: string): boolean {
    return this.openDropdown() === key;
  }
}

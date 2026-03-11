import { Component } from '@angular/core';
import { RecentProducts } from './components/recent-products/recent-products';
import {
  HlmCarousel,
  HlmCarouselContent,
  HlmCarouselItem,
  HlmCarouselNext,
  HlmCarouselPrevious,
  HlmCarouselSlideDisplay
} from '@spartan-ng/helm/carousel';

@Component({
  selector: 'app-home',
  imports: [
    RecentProducts,
    HlmCarousel,
    HlmCarouselContent,
    HlmCarouselItem,
    HlmCarouselSlideDisplay
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

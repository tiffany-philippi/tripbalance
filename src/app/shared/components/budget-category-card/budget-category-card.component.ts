import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CategoriesService } from 'src/app/core/services/categories';
import { TripsService } from 'src/app/core/services/trips';

@Component({
  selector: 'app-budget-category-card',
  templateUrl: './budget-category-card.component.html',
  styleUrls: ['./budget-category-card.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class BudgetCategoryCardComponent implements OnInit {
  @Input({ required: true }) tripId!: string | null;

  loading: boolean = true;
  hasError: boolean = false;
  categories: any[] = [];

  constructor(
    private tripsService: TripsService,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit() { 
    this.loadData();
  }


  async loadData() {
    const { data, error } = await this.categoriesService.getCategories(this.tripId!);

    this.loading = false;
    this.categories = data!;
    this.hasError = error !== null;
  }

  getSavingsClass(planned: number, spent: number): string {
    return this.tripsService.getSavingsClass(planned, spent);
  }

  isMoreThanZero(value: number): boolean {
    return this.tripsService.isMoreThanZero(value);
  }

  // @TODO: Create category page 
  openCategory(category: any) {
    // this.router.navigate([`trip-details/${this.tripId}/category/${category.id}`])
  }
}

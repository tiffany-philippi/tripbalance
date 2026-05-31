import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ActionSheetController, IonicModule } from "@ionic/angular";
import { AuthService } from "src/app/core/services/auth";
import { BudgetService } from "src/app/core/services/budget";
import { CategoriesService } from "src/app/core/services/categories";
import { HeaderService } from "src/app/core/services/header";
import { ToastService } from "src/app/core/services/toast";
import { TripsService } from "src/app/core/services/trips";
import { CreateTripPage } from "./create-trip/create-trip.page";
import { CreateBudgetPage } from "./create-budget/create-budget.page";
import { SelectCategoriesPage } from "./select-categories/select-categories.page";
import { Category } from "src/app/models/trip.model";

@Component({
    selector: 'app-trip-setup',
    templateUrl: './trip-setup.page.html',
    styleUrls: ['./trip-setup.page.scss'],
    imports: [
        CommonModule,
        IonicModule,
        CreateTripPage,
        SelectCategoriesPage,
        CreateBudgetPage,
    ],
})
export class TripSetupPage {
    currentStep: number = 1;
    totalSteps: number = 3;

    tripInfo: any = {}
    selectedCategories: Category[] = []
    budgetSetup: { category_id: string; planned_amount: number }[] = [];

    loadingSubmit: boolean = false;

    constructor(
        private headerService: HeaderService,
        private tripsService: TripsService,
        private authService: AuthService,
        private toastService: ToastService,
        private categoriesService: CategoriesService,
        private budgetService: BudgetService,
        private router: Router,
        private actionCtrl: ActionSheetController,
    ) { }

    ionViewWillEnter() {
        this.headerService.setHeader('New Trip', false);
        this.currentStep = 1;
    }

    next(data: any) {
        if (this.currentStep === 1) this.tripInfo = data;
        if (this.currentStep === 2) this.selectedCategories = data;
        if (this.currentStep === 3) this.budgetSetup = data;

        if (this.currentStep < this.totalSteps) this.currentStep++;
        else this.submit();
    }

    previous() {
        if (this.currentStep > 1) this.currentStep--;
    }

    async cancel() {
        const actionSheet = await this.actionCtrl.create({
            header: 'Cancel trip creation?',
            buttons: [
                {
                    text: 'Yes, cancel',
                    role: 'destructive',
                    handler: () => {
                        this.router.navigate(['/home'], { replaceUrl: true });
                    }
                },
                {
                    text: 'Continue editing',
                    role: 'cancel',
                }
            ]
        });

        await actionSheet.present();
    }

    async submit() {
        this.loadingSubmit = true;

        const { data: trip, error: tripError } = await this.tripsService.createTrip({
            ...this.tripInfo,
            status: 'active',
            created_by: (await this.authService.getSession()).data.session?.user.id
        });

        if (tripError || !trip) {
            await this.toastService.error('Error creating trip. Try again.');
            this.loadingSubmit = false;
            return;
        }

        const tripId = trip[0].id;

        const { error: categoriesError } = await this.categoriesService.createTripCategories(
            tripId,
            this.selectedCategories.map(category => category.id)
        );

        if (categoriesError) {
            await this.toastService.error('Error saving selected categories. Try again.');
            this.loadingSubmit = false;
            return;
        }

        const rows = this.budgetSetup.map(category => ({
            trip_id: tripId,
            category_id: category.category_id,
            planned_amount: category.planned_amount,
        }));
        const { error: budgetError } = await this.budgetService.createBudgets(rows);

        if (budgetError) {
            await this.toastService.error('Error saving budget. Try again.');
            this.loadingSubmit = false;
            return;
        }

        this.loadingSubmit = false;
        await this.toastService.success('Trip created successfully!');
        this.router.navigate([`/trip-details/${tripId}`], { replaceUrl: true });
    }
}
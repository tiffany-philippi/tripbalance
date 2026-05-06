import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderService {
    title = signal<string>('Minhas Viagens');
    showBackButton = signal<boolean>(false);

    setTitle(title: string) {
        this.title.set(title);
    }

    setShowBackButton(show: boolean) {
        this.showBackButton.set(show);
    }

    setHeader(title: string, showBackButton: boolean) {
        this.title.set(title);
        this.showBackButton.set(showBackButton);
    }
}
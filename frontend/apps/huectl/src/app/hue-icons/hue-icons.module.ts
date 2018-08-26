import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule()
export class HueIconsModule {
    constructor(registry : MatIconRegistry,
                sanitizer : DomSanitizer) {
        registry.addSvgIcon('Living room', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/living.svg'));
        registry.addSvgIcon('Kitchen', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/kitchen.svg'));
        registry.addSvgIcon('Dining', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/dining.svg'));
        registry.addSvgIcon('Bedroom', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/bedroom.svg'));
        registry.addSvgIcon('Kids bedroom', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/kids_bedroom.svg'));
        registry.addSvgIcon('Bathroom', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/bathroom.svg'));
        registry.addSvgIcon('Nursery', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/nursery.svg'));
        registry.addSvgIcon('Recreation', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/recreation.svg'));
        registry.addSvgIcon('Office', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/office.svg'));
        registry.addSvgIcon('Gym', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/gym.svg'));
        registry.addSvgIcon('Hallway', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/hallway.svg'));
        registry.addSvgIcon('Toilet', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/toiled.svg'));
        registry.addSvgIcon('Front door', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/front_door.svg'));
        registry.addSvgIcon('Garage Terrace', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/garage_terrace.svg'));
        registry.addSvgIcon('Garden', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/garden.svg'));
        registry.addSvgIcon('Driveway', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/driveway.svg'));
        registry.addSvgIcon('Carport', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/carport.svg'));
        registry.addSvgIcon('Other', sanitizer.bypassSecurityTrustResourceUrl('assets/hue-icons/other.svg'));
    }
}

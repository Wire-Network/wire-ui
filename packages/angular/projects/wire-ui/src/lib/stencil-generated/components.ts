/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@wireio/ui-library';


@ProxyCmp({
  inputs: ['bgDark', 'bgLight', 'buttonType', 'color', 'disabled', 'glow', 'icon', 'iconPosition', 'label', 'loading', 'size', 'theme', 'useSystemPreference', 'variant']
})
@Component({
  selector: 'wire-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['bgDark', 'bgLight', 'buttonType', 'color', 'disabled', 'glow', 'icon', 'iconPosition', 'label', 'loading', 'size', 'theme', 'useSystemPreference', 'variant'],
})
export class WireButton {
  protected el: HTMLWireButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WireButton extends Components.WireButton {}


@ProxyCmp({
  inputs: ['actions', 'heading', 'icon', 'theme']
})
@Component({
  selector: 'wire-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actions', 'heading', 'icon', 'theme'],
})
export class WireCard {
  protected el: HTMLWireCardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WireCard extends Components.WireCard {}


@ProxyCmp({
  inputs: ['color', 'name', 'size']
})
@Component({
  selector: 'wire-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'name', 'size'],
})
export class WireIcon {
  protected el: HTMLWireIconElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WireIcon extends Components.WireIcon {}


@ProxyCmp({
  inputs: ['mode', 'size', 'width']
})
@Component({
  selector: 'wire-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['mode', 'size', 'width'],
})
export class WireLogo {
  protected el: HTMLWireLogoElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WireLogo extends Components.WireLogo {}


@ProxyCmp({
  inputs: ['active', 'disabled', 'tab']
})
@Component({
  selector: 'wire-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'disabled', 'tab'],
})
export class WireTab {
  protected el: HTMLWireTabElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabClick']);
  }
}


export declare interface WireTab extends Components.WireTab {

  tabClick: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
})
@Component({
  selector: 'wire-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class WireTabs {
  protected el: HTMLWireTabsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WireTabs extends Components.WireTabs {}


@ProxyCmp({
  inputs: ['position']
})
@Component({
  selector: 'wire-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['position'],
})
export class WireToast {
  protected el: HTMLWireToastElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface WireToast extends Components.WireToast {}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private http: HttpClient) {}

  getMenuForRole(role: string): Observable<MenuItem[]> {
    return this.http.get('/config/menu-config.xml', { responseType: 'text' }).pipe(
      map((xmlString) => this.parseXMLToMenu(xmlString, role))
    );
  }

  private parseXMLToMenu(xml: string, role: string): MenuItem[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml.trim(), 'application/xml');
  const roleNodes = Array.from(xmlDoc.getElementsByTagName('Role'));
  const menuItems: MenuItem[] = [];

  const roleNode = roleNodes.find(r => r.getAttribute('name')?.toLowerCase() === role.toLowerCase());
  if (!roleNode) return [];

  const menus = Array.from(roleNode.getElementsByTagName('Menu'));
  menus.forEach(menu => {
    const subItems: MenuItem[] = [];

    Array.from(menu.getElementsByTagName('Item')).forEach(item => {
      const label = item.getAttribute('label') ?? '';      
      const icon = item.getAttribute('icon') ?? undefined; 
      const route = item.getAttribute('route') ?? '';

      if (label && route) {
        subItems.push({
          label,
          icon,
          routerLink: [route]
        });
      }
    });

    const menuLabel = menu.getAttribute('label') ?? '';
    const menuIcon = menu.getAttribute('icon') ?? undefined;

    if (menuLabel && subItems.length) {
      menuItems.push({
        label: menuLabel,
        icon: menuIcon,
        items: subItems
      });
    }
  });

  return menuItems;
}

}
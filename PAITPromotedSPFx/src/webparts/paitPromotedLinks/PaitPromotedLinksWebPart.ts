import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PaitPromotedLinksWebPart.module.scss';
import * as strings from 'PaitPromotedLinksWebPartStrings';
import { IPaitPromotedLinksWebPartProps } from './IPaitPromotedLinksWebPartProps';

import 'jquery';  
import 'flip';
declare var $;

export default class PaitPromotedLinksWebPartWebPart extends BaseClientSideWebPart<IPaitPromotedLinksWebPartProps> {

  public render(): void {
    require('./PAITGroup.PromotedLinks.js');
    require('./PAITGroup.PromotedLinks.css');
    require('./masonry.pkgd.min.js');
    
    this.domElement.innerHTML = `<div id="PAITLinks" ></div>`;

    $().PAITGroupPromotedLinks({
      listName: this.properties.listName,
      tileWidth:   this.properties.tileWidth,
      tileHeight:    this.properties.tileHeight,
      showTitle:    this.properties.showTitle,
      absoluteUrl: this.context.pageContext.site.absoluteUrl
    });


  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameDescription
                }),
                PropertyPaneTextField('tileHeight', {
                  label: strings.TileHeightDescription
                }),
                PropertyPaneTextField('tileWidth', {
                  label: strings.TileWidthDescription
                }),
                PropertyPaneCheckbox('showTitle', {
                  text: strings.ShowTitleDescription,
                  checked: true
                })
                
              ]
            }
          ]
        }
      ]
    };
  }
  protected get disableReactivePropertyChanges(): boolean {	
    return true;
  }
  
}

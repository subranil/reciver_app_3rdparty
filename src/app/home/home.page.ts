import {ThrowStmt} from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import {AlertController, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isLoaded = false;
  artifactUrl: string;

  searchFilter = {
    request: {
      filters: {
        channel: [],
        audience: [],
        primaryCategory: [
          'Digital Textbook',
          'eTextbook'
        ],
        subjects: [],
        boards: [
          'State (Andhra Pradesh)'
        ],
        mediums: [
          'English'
        ],
        gradeLevels: [
          'Class 4',
          'Class 6',
          'Class 2',
          'Class 10'
        ]
      },
      limit: 100,
      fields: [
        'name',
        'appIcon',
        'mimeType',
        'gradeLevel',
        'identifier',
        'medium',
        'pkgVersion',
        'board',
        'subject',
        'resourceType',
        'primaryCategory',
        'contentType',
        'channel',
        'organisation',
        'trackable',
        'se_boards',
        'se_subjects',
        'se_mediums',
        'se_gradeLevels'
      ],
      facets: [
        'se_subjects'
      ]
    }
  };

  profile = {
    request: {
      board: ['CBSE'],
      medium: ['English'],
      gradeLevel: ['Class 10']
    }
  };

  routerNavigationData = {
    request: {
      route: 'guest-profile',
    }
  };

  constructor(private alertCtrl: AlertController) {
  }

  ngOnInit() {
    document.addEventListener(
      'deviceready',
      () => {
        (window as any).plugins.intentShim.getIntent(async (intent) => {
          this.artifactUrl = intent.extras.artifactUrl;
          const contextData = await this.alertCtrl.create({
            message: `<pre>${JSON.stringify(
              intent.extras,
              undefined,
              2
            )}</pre>`,
          });
          contextData.present();
          this.isLoaded = true;
        }, console.error);
      },
      false
    );
  }

  test() {

    // normal deeplink
    (window as any).plugins.intentShim.startActivity({
      package: 'org.sunbird.app.staging',
      action: 'android.intent.action.VIEW',
      extras: {
        type: 'ACTION_DEEPLINK',
        payload: {
          request: {
            url: 'https://staging.sunbirded.org/play/collection/do_31285387850539827216067?referrer=utm_source%3Dmobile%26utm_campaign%3Dshare_content'
          }
        }
      }
    }, (success) => {
      console.log('-------------', success);
    }, (err) => {
      console.log('--', err);
    });
  }

  test2() {
    // searchRequest or searchRequestFilterTest
    (window as any).plugins.intentShim.startActivity({
      package: 'org.sunbird.app.staging',
      action: 'android.intent.action.VIEW',
      extras: {
        type: 'ACTION_SEARCH',
        payload: this.searchFilter
      }
    }, (success) => {
      console.log('-------------', success);
    }, (err) => {
      console.log('--', err);
    });
  }

  test3() {
    // router navigation to a page test
    (window as any).plugins.intentShim.startActivity({
      package: 'org.sunbird.app.staging',
      action: 'android.intent.action.VIEW',
      extras: {
        type: 'ACTION_GOTO',
        payload: this.routerNavigationData
      }
    }, (success) => {
      console.log('-------------', success);
    }, (err) => {
      console.log('--', err);
    });
  }

  test4() {
    // setting profile attribute with bms test
    (window as any).plugins.intentShim.startActivity({
      package: 'org.sunbird.app.staging',
      action: 'android.intent.action.VIEW',
      extras: {
        type: 'ACTION_SETPROFILE',
        payload: {
          request: {
            board: ['CBSE'],
            medium: ['English'],
            gradeLevel: ['Class 10']
          }
        }
      }
    }, (success) => {
      console.log('-------------', success);
    }, (err) => {
      console.log('--', err);
    });
  }

  test5() {
    // normal doId test with contentId or collectionId
    (window as any).plugins.intentShim.startActivity({
      package: 'org.sunbird.app.staging',
      action: 'android.intent.action.VIEW',
      extras: {
        type: 'ACTION_PLAY',
        payload: {
          request: {
            objectId: 'do_2130490677921955841457', // Can be Content ID/Question Set ID/Event Set ID // Action Set ID
            collection: 'do_2130490677921955841457'
          }
        }
      }
    }, (success) => {
      console.log('-------------', success);
    }, (err) => {
      console.log('--', err);
    });
  }
}

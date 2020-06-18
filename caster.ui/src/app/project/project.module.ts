/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon(R) and CERT(R) are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ResizableModule } from 'angular-resizable-element';
import { ProjectQuery, ProjectService, ProjectStore } from './state';
import { DirectoriesModule } from '../directories';
import { ProjectComponent } from './component/project-details/project/project.component';
import { ProjectListComponent } from './component/project-home/project-list/project-list.component';
import { ProjectListContainerComponent } from './component/project-home/project-list-container/project-list-container.component';
import { CwdAuthGuardService } from '../sei-cwd-common/cwd-auth/services';
import { CwdToolbarModule } from '../sei-cwd-common/cwd-toolbar';
import { EditorModule } from '../editor/editor.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { ProjectTabComponent } from './component/project-details/project-tab/project-tab.component';
import { ProjectNavigationContainerComponent } from './component/project-details/project-navigation-container/project-navigation-container.component';
import { ProjectCollapseContainerComponent } from './component/project-details/project-collapse-container/project-collapse-container.component';
import { ConfirmDialogComponent } from '../sei-cwd-common/confirm-dialog/components/confirm-dialog.component';
import { NameDialogComponent } from '../sei-cwd-common/name-dialog/name-dialog.component';
import { DirectoryPanelComponent } from './component/project-details/project-navigation-container/directory-panel/directory-panel.component';
import { ProjectBreadcrumbComponent } from './component/project-details/project-breadcrumb/project-breadcrumb.component';
import { CanDeactivateGuard } from 'src/app/sei-cwd-common/cwd-route-guards/can-deactivate.guard';
import { FilesFilterPipe } from './pipes/files-filter-pipe';
import { ProjectExportComponent } from './component/project-details/project-export/project-export.component';
import { TopbarComponent } from '../shared/components/topbar/topbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

const projectRoutes: Routes = [
  {
    path: 'projects',
    component: ProjectListContainerComponent,
    canActivate: [CwdAuthGuardService],
  },
  {
    path: 'projects/:id',
    component: ProjectCollapseContainerComponent,
    canActivate: [CwdAuthGuardService],
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectListComponent,
    ProjectListContainerComponent,
    ProjectNavigationContainerComponent,
    ProjectCollapseContainerComponent,
    ConfirmDialogComponent,
    NameDialogComponent,
    DirectoryPanelComponent,
    ProjectBreadcrumbComponent,
    ProjectTabComponent,
    FilesFilterPipe,
    ProjectExportComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(projectRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSortModule,
    MatTooltipModule,
    MatTabsModule,
    RouterModule,
    ResizableModule,
    CwdToolbarModule,
    DirectoriesModule,
    WorkspaceModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatBadgeModule,
    MatDialogModule,
    EditorModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatToolbarModule,
  ],
  exports: [
    ProjectComponent,
    ProjectListContainerComponent,
    ProjectNavigationContainerComponent,
    ProjectBreadcrumbComponent,
    ProjectTabComponent,
    TopbarComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    NameDialogComponent,
    ProjectExportComponent,
  ],
})
export class ProjectModule {}

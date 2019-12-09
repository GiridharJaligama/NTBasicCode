import { DashboardModule } from './dashboard.module';

describe('DashboardModule', () => {
    let DashboardModule: DashboardModule;

    beforeEach(() => {
        DashboardModule = new DashboardModule();
    });

    it('should create an instance', () => {
        expect(DashboardModule).toBeTruthy();
    });
});

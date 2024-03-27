
import { getCurrencyFromAString, convertToPercentageRate } from "../utilities/ui/user_actions";
import CredentialsFixtureConfigMerch from "../../fixtures/authentication/CredentialsFixtureConfigMerch.js";
class dashBoard {
    constructor() {
        let sumaryCardDescription = '.ml-3.overflow-hidden';
        let summaryCard = '.summary-card.p-2';
        let sumaryCardAmountLabel = '.value.text-truncate.ng-star-inserted';
        let getTotalTransactions = '.count';
        let transactionTrendGraph = '.graph-section app-transaction-trend .tingg-card';
        let barTransactionTrendGraph = '.col-lg-7 > .p-4 > .ng-star-inserted'

        this.payLinkSideMenu = () => {
            return cy.get('a').contains("Payment Links");
        };

        this.dashboardSideMenu = function () {
            return cy.get('[routerlink="/payment-links/dashboard"]');
        };
        this.datePickerButton = function () {
            return cy.get('.date-range-picker div')
        }

        this.chooseYearButton = function () {
            return cy.get('.owl-dt-control-period-button')
        }

        this.toDateRange = function () {
            return cy.get('.owl-dt-container-range-content').contains('To')
        }

        this.yearCalendar = function (calendarYear) {
            return cy.get('td').contains(calendarYear)
        }

        this.monthCalendar = function (monthOfYear) {
            return cy.get('td').contains(monthOfYear)
        }

        this.dayCalendar = function (dayOfMonth) {
            return cy.get('.owl-dt-calendar-cell-content').contains(dayOfMonth)
        }

        this.setButton = function () {
            return cy.get('.owl-dt-container-buttons button').contains('Set')
        }

        this.recentInvoices = function () {
            return cy.get('.recent')
        }

        this.transactionRedirectLink = function () {
            return 'routerlink="/payment-links/payments'
        }

        this.viewAllInvoicesLink = function () {

            return 'routerlink="/payment-links/payment-request"'
        }

        this.recentTransactionsStatus = function () {
            return cy.get('td.cdk-column-status')
        }
        this.dashboardPaymentRequest = function () {
            return cy.get('button').contains(' Request Payment ')
        }
        this.singleRequestPaymentOption = function () {
            return cy.get('h4:contains("Single Request")');
        };


        this.navigateToDashboard = function () {

            cy.fixture(CredentialsFixtureConfigMerch.getCredentialsFileName()).then(function (data) {
                cy.visit(data.merchant_user.base_URL.concat(data.merchant_user.routerLink_dashboard));
            })
            this.payLinkSideMenu().click();
            this.dashboardSideMenu().click()
        }


        this.getTotalSummaryCardAmount = function () {
            cy.get(summaryCard).each(($card) => {
                cy.wrap($card).find(sumaryCardDescription).invoke('text').then((text) => {
                    cy.wait(1000)
                    if (text.includes("Total")) {
                        cy.wrap($card).find(getTotalTransactions).invoke('text').then(trans => {
                            console.log(getCurrencyFromAString(trans))
                        })
                        cy.wrap($card).find(sumaryCardAmountLabel).invoke('text').then(amountText => {

                            expect(getCurrencyFromAString(amountText)).to.not.equal("0.00");
                        });
                    }
                    if (text.includes("Successful")) {
                        cy.wrap($card).find(sumaryCardAmountLabel).invoke('text').then(amountText => {
                            expect(getCurrencyFromAString(amountText)).to.not.equal("0.00");
                        });
                    }
                    if (text.includes("Pending")) {
                        cy.wrap($card).find(sumaryCardAmountLabel).invoke('text').then(amountText => {
                            expect(getCurrencyFromAString(amountText)).to.not.equal("0.00");
                        });
                    }
                    if (text.includes("Promptness")) {
                        cy.wrap($card).find(sumaryCardAmountLabel).invoke('text').then(amountText => {
                            expect(getCurrencyFromAString(amountText)).to.not.equal("0.00");
                        });
                    }

                });
            });
        };

        this.getSummaryCardRates = function () {
            cy.get(summaryCard).each(($card) => {
                cy.wrap($card).find(sumaryCardDescription).invoke('text').then((text) => {
                    cy.wait(1000)
                    if (text.includes("Total")) {
                        cy.wrap($card).find(getTotalTransactions).invoke('text').as('totalTransacs')
                    }
                    if (text.includes("Pending")) {
                        cy.get('@totalTransacs').then(total => {
                            cy.wrap($card).find(getTotalTransactions).invoke('text').then(pending => {
                                let pendingTransactions = pending.match(/\d+/g)[0]
                                let pendingTransactionRate = Number(pending.match(/\d+/g)[1])
                                let pendingRate = convertToPercentageRate(pendingTransactions, getCurrencyFromAString(total))
                                expect(pendingRate).to.eq(pendingTransactionRate)
                            })
                        })
                    }
                    if (text.includes("Successful")) {
                        cy.get('@totalTransacs').then(total => {
                            cy.wrap($card).find(getTotalTransactions).invoke('text').then(pending => {
                                let pendingTransactions = pending.match(/\d+/g)[0]
                                let pendingTransactionRate = Number(pending.match(/\d+/g)[1])
                                let pendingRate = convertToPercentageRate(pendingTransactions, getCurrencyFromAString(total))
                                expect(pendingRate).to.eq(pendingTransactionRate)
                            })

                        })
                    }

                });
            });
        }



        this.dateFilter = function (year, monnth, day) {
            this.chooseYearButton().click()
            this.yearCalendar(year).click()
            this.monthCalendar(monnth).click()
            this.dayCalendar(day).click({ force: true })
        }

        this.filterDashboardByDate = function (fromFilterDateParams, toFilterDateParams) {
            this.datePickerButton().click()
            this.dateFilter(fromFilterDateParams[0], fromFilterDateParams[1], fromFilterDateParams[2])
            this.toDateRange().click()
            this.dateFilter(toFilterDateParams[0], toFilterDateParams[1], toFilterDateParams[2])
            this.setButton().click()
        }

        this.verifyRecentInvoices = function () {
            cy.request(this.viewAllInvoicesLink())
            this.recentInvoices().then(invoice => {
                cy.wrap(invoice).should('have.length', 4)
            })
        }

        this.verifyRecentTransactionsTableLink = function () {
            cy.request(this.transactionRedirectLink())
        }

        this.verifyRecentTransactionsStatus = function () {
            this.recentTransactionsStatus().then(status => {
                cy.wrap(status).should('have.length', 10)
            }).each(status => {
                expect(status.text().trim()).to.eq('Completed')
            })
        }

        this.verifyPaymentRequestFromDashboard = function () {
            this.dashboardPaymentRequest().click()
            this.singleRequestPaymentOption()
        }

        this.verfiyLineGraphUI = () => {
            cy.eyesCheckWindow({
                target: 'region',
                selector: transactionTrendGraph
            });
        }

        this.verifyBarGraphUI = () => {
            cy.eyesCheckWindow({
                target: 'region',
                selector: barTransactionTrendGraph
            });
        }



    }
}
module.exports = new dashBoard();

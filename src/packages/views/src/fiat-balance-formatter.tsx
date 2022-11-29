export class FiatBalanceFormatter {
  formatter: Intl.NumberFormat;
  percentFormatter: Intl.NumberFormat;

  constructor(locale = 'en-US', currency = 'USD') {
    this.formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'currency',
      currency: currency,
    });
    this.percentFormatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  public fiatValue(number: number): string {
    return `${this.formatter.format(number)}`;
  }

  public fiatValueChange(number: number): string {
    if (number >= 0) {
      return `${this.formatter.format(number)}`;
    }
    return `-${this.formatter.format(Math.abs(number))}`;
  }

  public fiatValueChangePercentage(
    number: number,
    excludeSign: boolean = true,
  ): string {
    if (!excludeSign) {
      const sign = number >= 0 ? '+' : '';
      return `${sign}${this.percentFormatter.format(number)}%`;
    }
    return `${this.percentFormatter.format(number)}%`;
  }
}

import React from 'react';
import renderer from 'react-test-renderer';

import { CURRENCY } from '../../constants/common';
import wallet from '../../utils/userWalletMock.json';

import AmountInput from '../../components/AmountInput';
import AvailableCurrency from '../../components/AvailableCurrency';
import CalculatorInput from '../../components/CalculatorInput';
import CurrencySelect from '../../components/CurrencySelect';
import ExchangeButton from '../../components/ExchangeButton';
import ExchangeConfirmationModal from '../../components/ExchangeConfirmationModal';
import ExchangeRateInfo from '../../components/ExchangeRateInfo';
import SwitchCurrenciesButton from '../../components/SwitchCurrenciesButton';

test('Create components snapshots', () => {
  const AmountInputComponent = renderer.create(
    <AmountInput currentValue="1234.50" />,
  );
  const AvailableCurrencyComponent = renderer.create(
    <AvailableCurrency
      symbol="$"
      availableMoney="1234.50" />,
  );
  const CalculatorInputComponent = renderer.create(
    <CalculatorInput
      userWallet={wallet.userWallet}
      currency={CURRENCY.USD}
      selectedCurrency={{
        availableMoney: 1000,
        symbol: "$"
      }}
    />,
  );
  const CurrencySelectComponent = renderer.create(
    <CurrencySelect
      currency={CURRENCY.EUR}
      currencies={wallet.userWallet} />,
  );
  const ExchangeButtonComponent = renderer.create(
    <ExchangeButton />,
  );
  const ExchangeConfirmationModalComponent = renderer.create(
    <ExchangeConfirmationModal
      amountFrom="100"
      currencyFrom={CURRENCY.EUR}
      amountTo="404.50"
      currencyTo={CURRENCY.PLN}
      open={false}
    />,
  );
  const ExchangeRateInfoComponent = renderer.create(
    <ExchangeRateInfo
      symbol="$"
      rate="1"
      currencyTo={CURRENCY.PLN}
    />,
  );
  const SwitchCurrenciesButtonComponent = renderer.create(
    <SwitchCurrenciesButton />,
  );

  let AmountInputComponentTree = AmountInputComponent.toJSON();
  let AvailableCurrencyComponentTree = AvailableCurrencyComponent.toJSON();
  let CalculatorInputComponentTree = CalculatorInputComponent.toJSON();
  let CurrencySelectComponentTree = CurrencySelectComponent.toJSON();
  let ExchangeButtonComponentTree = ExchangeButtonComponent.toJSON();
  let ExchangeConfirmationModalComponentTree = ExchangeConfirmationModalComponent.toJSON();
  let ExchangeRateInfoComponentTree = ExchangeRateInfoComponent.toJSON();
  let SwitchCurrenciesButtonComponentTree = SwitchCurrenciesButtonComponent.toJSON();

  expect(AmountInputComponentTree).toMatchSnapshot();
  expect(AvailableCurrencyComponentTree).toMatchSnapshot();
  expect(CalculatorInputComponentTree).toMatchSnapshot();
  expect(CurrencySelectComponentTree).toMatchSnapshot();
  expect(ExchangeButtonComponentTree).toMatchSnapshot();
  expect(ExchangeConfirmationModalComponentTree).toMatchSnapshot();
  expect(ExchangeRateInfoComponentTree).toMatchSnapshot();
  expect(SwitchCurrenciesButtonComponentTree).toMatchSnapshot();

});
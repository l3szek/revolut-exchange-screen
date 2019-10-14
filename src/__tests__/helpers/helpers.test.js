import { formatNumber, getFormattedValue } from '../../utils/helpers';

describe('heper functions tests', () => { 

  it('should properly format the given number', () => { 
    const unFormattedNumber = '1200ae<>500123456';
    const formattedNumber = '1200500123';
    expect(formatNumber(unFormattedNumber)).toBe(formattedNumber)
  })

  it('should remove 0 from the beginning of an input', () => { 
    const unFormattedNumber = '012';
    const formattedNumber = '12';
    expect(getFormattedValue(unFormattedNumber)).toBe(formattedNumber)
  })

  it('should return formatted number with only 2 decimal digits', () => { 
    const unFormattedNumber = '123abc555098712.5043';
    const formattedNumber = '1235550987.50';
    expect(getFormattedValue(unFormattedNumber)).toBe(formattedNumber)
  })

})
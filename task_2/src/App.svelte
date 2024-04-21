<script lang="ts">
 let currencyFrom: string = 'USD';
 let currencyTo: string = 'EUR';
 let amountFrom: number = 1;
 let amountTo: number = 0;

 async function convertCurrency(): Promise<void> {
    if (!currencyFrom || !currencyTo || !amountFrom) return;

    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${currencyFrom}`);
      const data: { rates: { [key: string]: number } } = await response.json();
      const rate = data.rates[currencyTo];
      amountTo = amountFrom * rate;
    } catch (error) {
      console.error('Ошибка при конвертации валюты:', error);
    }
 }
</script>

<main>
<input type="text" bind:value={currencyFrom} placeholder="Введите валюту откуда" on:input={convertCurrency} />
<input type="text" bind:value={currencyTo} placeholder="Введите валюту куда" on:input={convertCurrency} />
<input type="number" bind:value={amountFrom} on:input={convertCurrency} placeholder="Сумма откуда" />
<input type="number" bind:value={amountTo} placeholder="Сумма куда" readonly />
</main>

<style>

</style>

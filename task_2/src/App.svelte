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
  <div class="app-title">Мини приложение для просмотра курса валют</div>

  <div class="input-group">
   <input type="text" bind:value={currencyFrom} placeholder="Введите исходную валюту" on:input={convertCurrency} />
   <input type="text" bind:value={currencyTo} placeholder="Введите на какую валюту хотите поменять" on:input={convertCurrency} />
   <input type="number" bind:value={amountFrom} on:input={convertCurrency} placeholder="Количесто единиц валюты " />
   <input type="number" bind:value={amountTo} placeholder="Стоимость валюты" readonly />
  </div>
</main>

<style>
 .app-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
 }

 .input-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
 }

 .input-group input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
 }

 .input-group input[readonly] {
    background-color: #f0f0f0;
 }
</style>

<script>
  import Chart from 'svelte-frappe-charts';
  export let data;
</script>

<div class="chart-container" >
    <Chart data={data} type="line" />
</div>


<style>
.chart-container
{
    margin: 0;
}
</style>
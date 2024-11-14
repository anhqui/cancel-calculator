document.addEventListener('DOMContentLoaded', ()=>{
const startYear1 = document.querySelector('.start-year1')
const startYear2 = document.querySelector('.start-year2')
const cancelYear1 = document.querySelector('.cancel-year1')
const cancelYear2 = document.querySelector('.cancel-year2')
const form = document.querySelector('.cancel-form')
const policyTermEl = document.querySelector('.policy-term-el')
const policyCostEl = document.querySelector('.policy-cost-el')
const startDateEl = document.querySelector('.start-date-el')
const cancelDateEl = document.querySelector('.cancel-date-el')
const dayLeftEl = document.querySelectorAll('.left-days-el')
const insuranceUsedCostEl = document.querySelector('.insurance-used-cost-el')
const cancelCostEl = document.querySelector('.cancel-cost-el')
const totalCancelCostEl = document.querySelector('.total-cancel-cost-el')



// console.log(rate)


const date = new Date()
const currentYear = date.getFullYear()
const lastYear = currentYear - 1
const nextYear = currentYear + 1


// start year
startYear1.value = lastYear
startYear1.textContent = lastYear

startYear2.value = currentYear
startYear2.textContent = currentYear

// cancel year
cancelYear1.value = currentYear
cancelYear1.textContent = currentYear

cancelYear2.value = nextYear
cancelYear2.textContent = nextYear

// days Left
function daysBetweenDates(date1, date2) {
    // Parse the dates to JavaScript Date objects
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Ensure that the dates are valid
    if (isNaN(startDate) || isNaN(endDate)) {
        throw new Error('Invalid date format');
    }

    // Calculate the difference in time (milliseconds)
    const timeDifference = Math.abs(endDate - startDate);

    // Convert the time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference.toFixed(0);
}


// handleSubmit
form.addEventListener('submit', async (e)=>{
    e.preventDefault();
   const formData = new FormData(e.target)
 
   const policyTerm = formData.get('policy-term')
   const startMonth = formData.get('start-month')
   const startDay = formData.get('start-day')
   const startYear = formData.get('start-year')
   const cancelMonth = formData.get('cancel-month')
   const cancelDay = formData.get('cancel-day')
   const cancelYear = formData.get('cancel-year')
   const policyCost = formData.get('policy-cost')

   policyTermEl.textContent = policyTerm
   policyCostEl.textContent = policyCost

   const startDate = new Date(`${startMonth} ${startDay} ${startYear}`).toLocaleString("en-CA", {
    dateStyle: "long"
  })

   startDateEl.textContent =  startDate

   const cancelDate = new Date(`${cancelMonth} ${cancelDay} ${cancelYear}`).toLocaleString("en-CA", {
    dateStyle: "long"
  })

   cancelDateEl.textContent = cancelDate

   const dayLeft =  daysBetweenDates(startDate, cancelDate)
   dayLeftEl.forEach(item => item.textContent = dayLeft)

     // fetch rate
    const res = await fetch('db.json')
    const data = await res.json()
    const rates = data.rates
rates.forEach(item =>{
    const {term, day, rate} =  item
    // console.log(term, day, rate)
   
})

if(policyTerm === '12' && dayLeft < 360){
    console.log('hello')
}
  

})





})
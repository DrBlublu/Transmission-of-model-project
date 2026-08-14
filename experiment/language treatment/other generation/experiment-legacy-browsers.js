/******************* 
 * Experiment *
 *******************/


// store info about the experiment session:
let expName = 'experiment';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
};

// Start code blocks for 'Before Experiment'

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}



function generateRandomFromGaussian(mean, standardDeviation) {
  let u1, u2;

  // Generate two independent random variables from a uniform distribution in (0, 1)
  do {
    u1 = Math.random();
    u2 = Math.random();
  } while (u1 <= Number.EPSILON); // Ensure u1 is not too close to 0

  // Box-Muller transform to generate random variables from a standard normal distribution
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  // const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

  // Scale and shift to the desired mean and standard deviation
  const result = z0 * standardDeviation + mean;

  return result;
}



function getRandomIntInRange(a, b) {
  // Math.floor is used to round down to the nearest integer
  // Math.random() generates a random float between 0 (inclusive) and 1 (exclusive)
  return Math.floor(Math.random() * (b - a + 1)) + a;
}


// Function to perform roulette wheel selection on a population

function rouletteWheelSelection(population) {
  while (true) {
    // Step 1: Select an individual uniformly at random
    const selectedIndex = Math.floor(Math.random() * population.length);
    // Step 2: Accept with probability wi/wmax (score_norm)
    if (Math.random() < population[selectedIndex]["score_norm"]) {
      return population[selectedIndex]["cond_filename"];
    }
    // If not accepted, repeat the process
  }
}


function tournamentSelection(population, k) {
    let selectedIndices = new Set();
    let tournament = [];
    while(selectedIndices.size < k) {
        let randomIndex = Math.floor(Math.random() * population.length);
        selectedIndices.add(randomIndex);
    }
    Array.from(selectedIndices).forEach(index => {
        tournament.push(population[index]);
    });
    tournament.sort((a, b) => b.score_norm - a.score_norm);
    return tournament[0]["cond_filename"];
}
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0.0, 0.0, 0.0]),
  units: 'height',
  waitBlanking: true,
  backgroundImage: '',
  backgroundFit: 'none',
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(global_setupRoutineBegin());
flowScheduler.add(global_setupRoutineEachFrame());
flowScheduler.add(global_setupRoutineEnd());
flowScheduler.add(consentRoutineBegin());
flowScheduler.add(consentRoutineEachFrame());
flowScheduler.add(consentRoutineEnd());
const show_trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(show_trialsLoopBegin(show_trialsLoopScheduler));
flowScheduler.add(show_trialsLoopScheduler);
flowScheduler.add(show_trialsLoopEnd);














































































const show_no_consentLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(show_no_consentLoopBegin(show_no_consentLoopScheduler));
flowScheduler.add(show_no_consentLoopScheduler);
flowScheduler.add(show_no_consentLoopEnd);


flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'training_pairIndex.csv', 'path': 'training_pairIndex.csv'},
    {'name': 'trials_pairIndex.csv', 'path': 'trials_pairIndex.csv'},
    {'name': 'pl1.xlsx', 'path': 'pl1.xlsx'},
    {'name': 'pl2.xlsx', 'path': 'pl2.xlsx'},
    {'name': 'ressources/consent.png', 'path': 'ressources/consent.png'},
    {'name': 'ressources/global_instruction_1.PNG', 'path': 'ressources/global_instruction_1.PNG'},
    {'name': 'ressources/global_instruction_2.PNG', 'path': 'ressources/global_instruction_2.PNG'},
    {'name': 'ressources/global_instruction_3.PNG', 'path': 'ressources/global_instruction_3.PNG'},
    {'name': 'ressources/global_instruction_4.PNG', 'path': 'ressources/global_instruction_4.PNG'},
    {'name': 'ressources/stake_instructions.png', 'path': 'ressources/stake_instructions.png'},
    {'name': 'ressources/global_instruction_5.PNG', 'path': 'ressources/global_instruction_5.PNG'},
    {'name': 'ressources/t_instructions_1.PNG', 'path': 'ressources/t_instructions_1.PNG'},
    {'name': 'ressources/t_instructions_2.PNG', 'path': 'ressources/t_instructions_2.PNG'},
    {'name': 'ressources/break.png', 'path': 'ressources/break.png'},
    {'name': 'ressources/pl_global_instructions.PNG', 'path': 'ressources/pl_global_instructions.PNG'},
    {'name': 'ressources/vb_instructions.PNG', 'path': 'ressources/vb_instructions.PNG'},
    {'name': 'ressources/vb_instructions_2.PNG', 'path': 'ressources/vb_instructions_2.PNG'},
    {'name': 'ressources/pl1_instructions_1.PNG', 'path': 'ressources/pl1_instructions_1.PNG'},
    {'name': 'ressources/pl1_instructions_2.PNG', 'path': 'ressources/pl1_instructions_2.PNG'},
    {'name': 'ressources/pl1_instructions_3.PNG', 'path': 'ressources/pl1_instructions_3.PNG'},
    {'name': 'ressources/pl1_instructions_4.PNG', 'path': 'ressources/pl1_instructions_4.PNG'},
    {'name': 'default.png', 'path': 'https://pavlovia.org/assets/default/default.png'},
    {'name': 'ressources/pl2_instructions.PNG', 'path': 'ressources/pl2_instructions.PNG'},
    {'name': 'ressources/cond/chain0.csv', 'path': 'ressources/cond/chain0.csv'},
    {'name': 'ressources/cond/chain1.csv', 'path': 'ressources/cond/chain1.csv'},
    {'name': 'ressources/cond/chain2.csv', 'path': 'ressources/cond/chain2.csv'},
    {'name': 'ressources/cond/chain3.csv', 'path': 'ressources/cond/chain3.csv'},
    {'name': 'ressources/cond/chain4.csv', 'path': 'ressources/cond/chain4.csv'},
    {'name': 'ressources/cond/chain5.csv', 'path': 'ressources/cond/chain5.csv'},
    {'name': 'ressources/cond/chain6.csv', 'path': 'ressources/cond/chain6.csv'},
    {'name': 'ressources/cond/chain7.csv', 'path': 'ressources/cond/chain7.csv'},
    {'name': 'ressources/cond/chain8.csv', 'path': 'ressources/cond/chain8.csv'},
    {'name': 'ressources/cond/chain9.csv', 'path': 'ressources/cond/chain9.csv'},
    {'name': 'ressources/cond/chain10.csv', 'path': 'ressources/cond/chain10.csv'},
    {'name': 'ressources/cond/chain11.csv', 'path': 'ressources/cond/chain11.csv'},
    {'name': 'ressources/cond/chain12.csv', 'path': 'ressources/cond/chain12.csv'},
    {'name': 'ressources/cond/chain13.csv', 'path': 'ressources/cond/chain13.csv'},
    {'name': 'ressources/cond/chain14.csv', 'path': 'ressources/cond/chain14.csv'},
    {'name': 'ressources/cond/chain15.csv', 'path': 'ressources/cond/chain15.csv'},
    {'name': 'ressources/cond/chain16.csv', 'path': 'ressources/cond/chain16.csv'},
    {'name': 'ressources/cond/chain17.csv', 'path': 'ressources/cond/chain17.csv'},
    {'name': 'ressources/cond/chain18.csv', 'path': 'ressources/cond/chain18.csv'},
    {'name': 'ressources/cond/chain19.csv', 'path': 'ressources/cond/chain19.csv'},
    {'name': 'ressources/cond/chain20.csv', 'path': 'ressources/cond/chain20.csv'},
    {'name': 'ressources/cond/chain21.csv', 'path': 'ressources/cond/chain21.csv'},
    {'name': 'ressources/cond/chain22.csv', 'path': 'ressources/cond/chain22.csv'},
    {'name': 'ressources/cond/chain23.csv', 'path': 'ressources/cond/chain23.csv'},
    {'name': 'ressources/cond/chain24.csv', 'path': 'ressources/cond/chain24.csv'},
    {'name': 'ressources/cond/chain25.csv', 'path': 'ressources/cond/chain25.csv'},
    {'name': 'ressources/cond/chain26.csv', 'path': 'ressources/cond/chain26.csv'},
    {'name': 'ressources/cond/chain27.csv', 'path': 'ressources/cond/chain27.csv'},
    {'name': 'ressources/cond/chain28.csv', 'path': 'ressources/cond/chain28.csv'},
    {'name': 'ressources/cond/chain29.csv', 'path': 'ressources/cond/chain29.csv'},
    {'name': 'ressources/cond/chain30.csv', 'path': 'ressources/cond/chain30.csv'},
    {'name': 'ressources/cond/chain31.csv', 'path': 'ressources/cond/chain31.csv'},
    {'name': 'ressources/cond/chain32.csv', 'path': 'ressources/cond/chain32.csv'},
    {'name': 'ressources/cond/chain33.csv', 'path': 'ressources/cond/chain33.csv'},
    {'name': 'ressources/cond/chain34.csv', 'path': 'ressources/cond/chain34.csv'},
    {'name': 'ressources/cond/chain35.csv', 'path': 'ressources/cond/chain35.csv'},
    {'name': 'ressources/cond/chain36.csv', 'path': 'ressources/cond/chain36.csv'},
    {'name': 'ressources/cond/chain37.csv', 'path': 'ressources/cond/chain37.csv'},
    {'name': 'ressources/cond/chain38.csv', 'path': 'ressources/cond/chain38.csv'},
    {'name': 'ressources/cond/chain39.csv', 'path': 'ressources/cond/chain39.csv'},
    {'name': 'ressources/cond/chain40.csv', 'path': 'ressources/cond/chain40.csv'},
    {'name': 'ressources/cond/chain41.csv', 'path': 'ressources/cond/chain41.csv'},
    {'name': 'ressources/cond/chain42.csv', 'path': 'ressources/cond/chain42.csv'},
    {'name': 'ressources/cond/chain43.csv', 'path': 'ressources/cond/chain43.csv'},
    {'name': 'ressources/cond/chain44.csv', 'path': 'ressources/cond/chain44.csv'},
    {'name': 'ressources/cond/chain45.csv', 'path': 'ressources/cond/chain45.csv'},
    {'name': 'ressources/cond/chain46.csv', 'path': 'ressources/cond/chain46.csv'},
    {'name': 'ressources/cond/chain47.csv', 'path': 'ressources/cond/chain47.csv'},
    {'name': 'ressources/cond/chain48.csv', 'path': 'ressources/cond/chain48.csv'},
    {'name': 'ressources/cond/chain49.csv', 'path': 'ressources/cond/chain49.csv'},
    {'name': 'ressources/cond/chain50.csv', 'path': 'ressources/cond/chain50.csv'},
    {'name': 'ressources/cond/chain51.csv', 'path': 'ressources/cond/chain51.csv'},
    {'name': 'ressources/cond/chain52.csv', 'path': 'ressources/cond/chain52.csv'},
    {'name': 'ressources/cond/chain53.csv', 'path': 'ressources/cond/chain53.csv'},
    {'name': 'ressources/cond/chain54.csv', 'path': 'ressources/cond/chain54.csv'},
    {'name': 'ressources/cond/chain55.csv', 'path': 'ressources/cond/chain55.csv'},
    {'name': 'ressources/cond/chain56.csv', 'path': 'ressources/cond/chain56.csv'},
    {'name': 'ressources/cond/chain57.csv', 'path': 'ressources/cond/chain57.csv'},
    {'name': 'ressources/cond/chain58.csv', 'path': 'ressources/cond/chain58.csv'},
    {'name': 'ressources/cond/chain59.csv', 'path': 'ressources/cond/chain59.csv'},
    {'name': 'ressources/cond/chain60.csv', 'path': 'ressources/cond/chain60.csv'},
    {'name': 'ressources/cond/chain61.csv', 'path': 'ressources/cond/chain61.csv'},
    {'name': 'ressources/cond/chain62.csv', 'path': 'ressources/cond/chain62.csv'},
    {'name': 'ressources/cond/chain63.csv', 'path': 'ressources/cond/chain63.csv'},
    {'name': 'ressources/cond/chain64.csv', 'path': 'ressources/cond/chain64.csv'},
    {'name': 'ressources/cond/chain65.csv', 'path': 'ressources/cond/chain65.csv'},
    {'name': 'ressources/cond/chain66.csv', 'path': 'ressources/cond/chain66.csv'},
    {'name': 'ressources/cond/chain67.csv', 'path': 'ressources/cond/chain67.csv'},
    {'name': 'ressources/cond/chain68.csv', 'path': 'ressources/cond/chain68.csv'},
    {'name': 'ressources/cond/chain69.csv', 'path': 'ressources/cond/chain69.csv'},
    {'name': 'ressources/cond/chain70.csv', 'path': 'ressources/cond/chain70.csv'},
    {'name': 'ressources/cond/chain71.csv', 'path': 'ressources/cond/chain71.csv'},
    {'name': 'ressources/cond/chain72.csv', 'path': 'ressources/cond/chain72.csv'},
    {'name': 'ressources/cond/chain73.csv', 'path': 'ressources/cond/chain73.csv'},
    {'name': 'ressources/cond/chain74.csv', 'path': 'ressources/cond/chain74.csv'},
    {'name': 'ressources/cond/chain75.csv', 'path': 'ressources/cond/chain75.csv'},
    {'name': 'ressources/cond/chain76.csv', 'path': 'ressources/cond/chain76.csv'},
    {'name': 'ressources/cond/chain77.csv', 'path': 'ressources/cond/chain77.csv'},
    {'name': 'ressources/cond/chain78.csv', 'path': 'ressources/cond/chain78.csv'},
    {'name': 'ressources/cond/chain79.csv', 'path': 'ressources/cond/chain79.csv'},
    {'name': 'ressources/cond/chain80.csv', 'path': 'ressources/cond/chain80.csv'},
    {'name': 'ressources/cond/chain81.csv', 'path': 'ressources/cond/chain81.csv'},
    {'name': 'ressources/cond/chain82.csv', 'path': 'ressources/cond/chain82.csv'},
    {'name': 'ressources/cond/chain83.csv', 'path': 'ressources/cond/chain83.csv'},
    {'name': 'ressources/cond/chain84.csv', 'path': 'ressources/cond/chain84.csv'},
    {'name': 'ressources/cond/chain85.csv', 'path': 'ressources/cond/chain85.csv'},
    {'name': 'ressources/cond/chain86.csv', 'path': 'ressources/cond/chain86.csv'},
    {'name': 'ressources/cond/chain87.csv', 'path': 'ressources/cond/chain87.csv'},
    {'name': 'ressources/cond/chain88.csv', 'path': 'ressources/cond/chain88.csv'},
    {'name': 'ressources/cond/chain89.csv', 'path': 'ressources/cond/chain89.csv'},
    {'name': 'ressources/cond/chain90.csv', 'path': 'ressources/cond/chain90.csv'},
    {'name': 'ressources/cond/chain91.csv', 'path': 'ressources/cond/chain91.csv'},
    {'name': 'ressources/cond/chain92.csv', 'path': 'ressources/cond/chain92.csv'},
    {'name': 'ressources/cond/chain93.csv', 'path': 'ressources/cond/chain93.csv'},
    {'name': 'ressources/cond/chain94.csv', 'path': 'ressources/cond/chain94.csv'},
    {'name': 'ressources/cond/chain95.csv', 'path': 'ressources/cond/chain95.csv'},
    {'name': 'ressources/cond/chain96.csv', 'path': 'ressources/cond/chain96.csv'},
    {'name': 'ressources/cond/chain97.csv', 'path': 'ressources/cond/chain97.csv'},
    {'name': 'ressources/cond/chain98.csv', 'path': 'ressources/cond/chain98.csv'},
    {'name': 'ressources/cond/chain99.csv', 'path': 'ressources/cond/chain99.csv'},
    {'name': 'ressources/cond/selection.csv', 'path': 'ressources/cond/selection.csv'},
    {'name': 'ressources/t_mult1_img.png', 'path': 'ressources/t_mult1_img.png'},
    {'name': 'ressources/t_mult5_img.png', 'path': 'ressources/t_mult5_img.png'},
    {'name': 'training_pairIndex.csv', 'path': 'training_pairIndex.csv'},
    {'name': 'trials_pairIndex.csv', 'path': 'trials_pairIndex.csv'},
    {'name': 'ressources/stake_instructions.png', 'path': 'ressources/stake_instructions.png'},
    {'name': 'ressources/break.png', 'path': 'ressources/break.png'},
    {'name': 'ressources/consent.png', 'path': 'ressources/consent.png'},
    {'name': 'ressources/fail_basket.png', 'path': 'ressources/fail_basket.png'},
    {'name': 'ressources/global_instruction_1.PNG', 'path': 'ressources/global_instruction_1.PNG'},
    {'name': 'ressources/global_instruction_2.PNG', 'path': 'ressources/global_instruction_2.PNG'},
    {'name': 'ressources/global_instruction_3.PNG', 'path': 'ressources/global_instruction_3.PNG'},
    {'name': 'ressources/global_instruction_4.PNG', 'path': 'ressources/global_instruction_4.PNG'},
    {'name': 'ressources/global_instruction_5.PNG', 'path': 'ressources/global_instruction_5.PNG'},
    {'name': 'ressources/grey_rectangle.png', 'path': 'ressources/grey_rectangle.png'},
    {'name': 'ressources/highlight.png', 'path': 'ressources/highlight.png'},
    {'name': 'ressources/license.txt', 'path': 'ressources/license.txt'},
    {'name': 'ressources/mush0.png', 'path': 'ressources/mush0.png'},
    {'name': 'ressources/mush1.png', 'path': 'ressources/mush1.png'},
    {'name': 'ressources/mush2.png', 'path': 'ressources/mush2.png'},
    {'name': 'ressources/mush3.png', 'path': 'ressources/mush3.png'},
    {'name': 'ressources/mush4.png', 'path': 'ressources/mush4.png'},
    {'name': 'ressources/mush5.png', 'path': 'ressources/mush5.png'},
    {'name': 'ressources/mush6.png', 'path': 'ressources/mush6.png'},
    {'name': 'ressources/mush7.png', 'path': 'ressources/mush7.png'},
    {'name': 'ressources/mush8.png', 'path': 'ressources/mush8.png'},
    {'name': 'ressources/mush9.png', 'path': 'ressources/mush9.png'},
    {'name': 'ressources/p_step1_stim1.png', 'path': 'ressources/p_step1_stim1.png'},
    {'name': 'ressources/p_step1_stim1_deact.png', 'path': 'ressources/p_step1_stim1_deact.png'},
    {'name': 'ressources/p_step1_stim2.png', 'path': 'ressources/p_step1_stim2.png'},
    {'name': 'ressources/p_step1_stim2_deact.png', 'path': 'ressources/p_step1_stim2_deact.png'},
    {'name': 'ressources/p_step1_stim3.png', 'path': 'ressources/p_step1_stim3.png'},
    {'name': 'ressources/p_step1_stim3_deact.png', 'path': 'ressources/p_step1_stim3_deact.png'},
    {'name': 'ressources/p_step1_stim4.png', 'path': 'ressources/p_step1_stim4.png'},
    {'name': 'ressources/p_step1_stim4_deact.png', 'path': 'ressources/p_step1_stim4_deact.png'},
    {'name': 'ressources/p_step1_tooSlow.png', 'path': 'ressources/p_step1_tooSlow.png'},
    {'name': 'ressources/p_step2_background1.png', 'path': 'ressources/p_step2_background1.png'},
    {'name': 'ressources/p_step2_background1_deact.png', 'path': 'ressources/p_step2_background1_deact.png'},
    {'name': 'ressources/p_step2_background2.png', 'path': 'ressources/p_step2_background2.png'},
    {'name': 'ressources/p_step2_background2_deact.png', 'path': 'ressources/p_step2_background2_deact.png'},
    {'name': 'ressources/p_step2_stim1.png', 'path': 'ressources/p_step2_stim1.png'},
    {'name': 'ressources/p_step2_stim2.png', 'path': 'ressources/p_step2_stim2.png'},
    {'name': 'ressources/p_step2_tooSlow.png', 'path': 'ressources/p_step2_tooSlow.png'},
    {'name': 'ressources/pl_global_instructions.PNG', 'path': 'ressources/pl_global_instructions.PNG'},
    {'name': 'ressources/pl1_instructions_1.PNG', 'path': 'ressources/pl1_instructions_1.PNG'},
    {'name': 'ressources/pl1_instructions_2.PNG', 'path': 'ressources/pl1_instructions_2.PNG'},
    {'name': 'ressources/pl1_instructions_3.PNG', 'path': 'ressources/pl1_instructions_3.PNG'},
    {'name': 'ressources/pl1_instructions_4.PNG', 'path': 'ressources/pl1_instructions_4.PNG'},
    {'name': 'ressources/pl2_instructions.PNG', 'path': 'ressources/pl2_instructions.PNG'},
    {'name': 'ressources/pl3_instructions.PNG', 'path': 'ressources/pl3_instructions.PNG'},
    {'name': 'ressources/pl4_instructions.PNG', 'path': 'ressources/pl4_instructions.PNG'},
    {'name': 'ressources/step1_background.png', 'path': 'ressources/step1_background.png'},
    {'name': 'ressources/step1_background_deact.png', 'path': 'ressources/step1_background_deact.png'},
    {'name': 'ressources/step1_smallGnome_deact.png', 'path': 'ressources/step1_smallGnome_deact.png'},
    {'name': 'ressources/step1_stim1.png', 'path': 'ressources/step1_stim1.png'},
    {'name': 'ressources/step1_stim2.png', 'path': 'ressources/step1_stim2.png'},
    {'name': 'ressources/step1_stim3.png', 'path': 'ressources/step1_stim3.png'},
    {'name': 'ressources/step1_stim4.png', 'path': 'ressources/step1_stim4.png'},
    {'name': 'ressources/step1_stim5.png', 'path': 'ressources/step1_stim5.png'},
    {'name': 'ressources/step1_stim6.png', 'path': 'ressources/step1_stim6.png'},
    {'name': 'ressources/step1_stim7.png', 'path': 'ressources/step1_stim7.png'},
    {'name': 'ressources/step1_stim8.png', 'path': 'ressources/step1_stim8.png'},
    {'name': 'ressources/step1_tallGnome_deact.png', 'path': 'ressources/step1_tallGnome_deact.png'},
    {'name': 'ressources/step2_background1.png', 'path': 'ressources/step2_background1.png'},
    {'name': 'ressources/step2_background1_deact.png', 'path': 'ressources/step2_background1_deact.png'},
    {'name': 'ressources/step2_background2.png', 'path': 'ressources/step2_background2.png'},
    {'name': 'ressources/step2_background2_deact.png', 'path': 'ressources/step2_background2_deact.png'},
    {'name': 'ressources/step2_stim1.png', 'path': 'ressources/step2_stim1.png'},
    {'name': 'ressources/step2_stim2.png', 'path': 'ressources/step2_stim2.png'},
    {'name': 'ressources/t_instructions_1.PNG', 'path': 'ressources/t_instructions_1.PNG'},
    {'name': 'ressources/t_instructions_2.PNG', 'path': 'ressources/t_instructions_2.PNG'},
    {'name': 'ressources/t_tooSlow.png', 'path': 'ressources/t_tooSlow.png'},
    {'name': 'ressources/vb_instructions.PNG', 'path': 'ressources/vb_instructions.PNG'},
    {'name': 'ressources/vb_instructions_2.PNG', 'path': 'ressources/vb_instructions_2.PNG'},
    {'name': 'ressources/break.png', 'path': 'ressources/break.png'},
    {'name': 'ressources/consent.png', 'path': 'ressources/consent.png'},
    {'name': 'ressources/fail_basket.png', 'path': 'ressources/fail_basket.png'},
    {'name': 'ressources/global_instruction_1.PNG', 'path': 'ressources/global_instruction_1.PNG'},
    {'name': 'ressources/global_instruction_2.PNG', 'path': 'ressources/global_instruction_2.PNG'},
    {'name': 'ressources/global_instruction_3.PNG', 'path': 'ressources/global_instruction_3.PNG'},
    {'name': 'ressources/global_instruction_4.PNG', 'path': 'ressources/global_instruction_4.PNG'},
    {'name': 'ressources/global_instruction_5.PNG', 'path': 'ressources/global_instruction_5.PNG'},
    {'name': 'pl1.xlsx', 'path': 'pl1.xlsx'},
    {'name': 'pl2.xlsx', 'path': 'pl2.xlsx'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.DATA);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2023.2.3';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  psychoJS.setRedirectUrls('https://app.prolific.com/submissions/complete?cc=C1KDRF07', 'https://app.prolific.com/submissions/complete?cc=CLOW3Z5C');


  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var global_setupClock;
var selection_file;
var selectionInfo;
var k;
var filename;
var chainInfo;
var advice;
var global_step1_stim_size;
var global_step1_stimLeft_pos;
var global_step1_stimRight_pos;
var global_highlight_size;
var global_step2_highlight_pos;
var global_step2_stim_size;
var global_step2_pos;
var global_score;
var global_score_pos;
var global_score_size;
var global_scoreBg_size;
var global_scoreBg_pos;
var global_rewardBg_size;
var global_rewardBg_pos;
var p_tooSlow_size;
var p_tooSlow_pos;
var t_tooSlow_size;
var t_tooSlow_pos;
var t_n_trial;
var pl_step1_stim_size;
var pl_task_stimUp_pos;
var pl_step2Bg_size;
var pl_basket_size;
var pl_step2LeftBg_pos;
var pl_step2RightBg_pos;
var pl2_task_stimLeft_pos;
var pl2_task_stimRight_pos;
var pl2_forest_size;
var pl2_basket_size;
var pl3_step2LeftBg_pos;
var pl3_step2RightBg_pos;
var pl3_task_stimLeft_pos;
var pl3_task_stimRight_pos;
var p_index;
var p_score;
var p_basket_names;
var rmin;
var rmax;
var rmean;
var high_reward;
var low_reward;
var l_reward;
var p_step2_stim1;
var p_step2_stim2;
var p_step1_stim1;
var p_step1_stim2;
var p_step1_stim3;
var p_step1_stim4;
var l_p_step1_stims;
var l_p_step2_stims;
var pair_num;
var i;
var t_step2_stim1;
var t_step2_stim2;
var t_step1_stim1;
var t_step1_stim2;
var t_step1_stim3;
var t_step1_stim4;
var t_step1_stim5;
var t_step1_stim6;
var t_step1_stim7;
var t_step1_stim8;
var l_t_step1_stims;
var l_t_step2_stims;
var p_points;
var p_step1_choice;
var p_step2_stim_var;
var t_points;
var t_step1_choice;
var t_step2_stim_var;
var p_step1_stimLeft_file;
var p_step1_stimRight_file;
var p_step2_stimBg_file;
var p_step2_stimBasket_file;
var pl1_index;
var pl1_task_index;
var pl1_task_step2LeftStim_var;
var pl1_task_step2RightStim_var;
var stim_num;
var consentClock;
var consent_keyresp;
var consent_img;
var global_instructions_1Clock;
var global_instructions1_img;
var global_instructions1_key;
var global_instructions_2Clock;
var global_instructions2_img;
var global_instructions2_key;
var global_instructions_3Clock;
var global_instructions3_img;
var global_instructions3_key;
var global_instructions_4Clock;
var global_instructions4_img;
var global_instructions4_key;
var stake_instructionsClock;
var stake_instructions_img;
var stake_instructions_key;
var global_instructions5Clock;
var global_instructions5_img;
var global_instructions5_key;
var t_countdownClock;
var t_countdown_3_txt;
var t_countdown_2_txt;
var t_countdown_1_txt;
var p_setupClock;
var p_fixation_2Clock;
var p_fixation_mandatory2_txt;
var p_stakeClock;
var p_stake_mandatory_txt;
var p_step1Clock;
var p_step1_keyresp;
var ITSClock;
var ITS_mandatory_txt;
var p_step2Clock;
var p_step2_keyresp;
var p_rewardClock;
var p_reward_mandatory_txt;
var p_failStep1Clock;
var p_failStep1_mandatory_txt;
var p_failStep1_keyresp;
var p_failStep2Clock;
var p_failStep2_mandatory_txt;
var p_failStep2_keyresp;
var p_dataClock;
var t_instructionsClock;
var t_instructions_img;
var t_instructions_keyresp;
var t_advice_readingClock;
var t_advice_textbox;
var t_advice_mouse;
var t_advice_finished_typing_rect;
var t_advice_finished_typing_txt;
var t_advice_summaryClock;
var t_advice_summary_textbox;
var t_advice_summary_finished_typing_rect;
var t_advice_summary_finished_typing_txt;
var t_advice_summary_txt;
var t_advice_summary_mouse;
var t_advice_summary_instructinos;
var t_instructions_2Clock;
var t_instructions_2_img;
var t_instructions_2_keyresp;
var t_setupClock;
var t_fixationClock;
var t_fixation_mandatory_txt;
var t_stakeClock;
var t_stake_mandatory_txt;
var t_step1Clock;
var t_step1_keyresp;
var t_step2Clock;
var t_step2_keyresp;
var t_rewardClock;
var t_reward_mandatory_txt;
var t_failStep1Clock;
var t_failStep1_mandatory_txt;
var t_failStep2Clock;
var t_failStep2_mandatory_txt;
var t_dataClock;
var t_breakClock;
var myClock;
var break_key_resp;
var t_break_img;
var t_break_advice_textbox;
var t_break_clock_text;
var pl_global_instructionsClock;
var pl_global_instructions_img;
var pl_global_instructions_keyresp;
var vb_instructionsClock;
var vb_instructions_img;
var vb_instructions_keyresp;
var vb_instructions_2Clock;
var vb_instructions_2_img;
var vb_instructions_2_keyresp;
var verbal_transmissionClock;
var vb_textbox;
var vb_finished_typing_rect;
var vb_finished_typing_txt;
var vb_txt;
var vb_mouse;
var pl1_instructions_1Clock;
var pl1_instructions1_img;
var pl1_instructions1_keyresp;
var pl1_instructions_2Clock;
var pl1_instructions2_img;
var pl1_instructions2_keyresp;
var pl1_instructions_3Clock;
var pl1_instructions3_img;
var pl1_instructions3_keyresp;
var pl1_instructions_4Clock;
var pl1_instructions4_img;
var pl1_instructions4_keyresp;
var pl1_setupClock;
var pl1_taskClock;
var pl1_task_lickert;
var pl1_task_confidence_lickert;
var pl1_task_stimLeft_img;
var pl1_task_stimRight_img;
var pl1_task_keyresp;
var pl1_task_fixation_txt;
var pl1_dataClock;
var pl2_instructionsClock;
var pl2_instructions_img;
var pl2_instructions_keyresp;
var pl2_setupClock;
var pl2_taskClock;
var pl2_task_lickert;
var pl2_task_confidence_lickert;
var pl2_task_gnome_img;
var pl2_task_keyresp;
var pl2_task_forest_img;
var pl2_task_basket_img;
var pl2_task_fixation_txt;
var pl2_dataClock;
var endClock;
var end_txt;
var end_keyresp;
var no_consent_screenClock;
var no_consent_txt;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "global_setup"
  global_setupClock = new util.Clock();
  // Run 'Begin Experiment' code from global_setup_code
  
          // add-on: list(s: string): string[]
          function list(s) {
              // if s is a string, we return a list of its characters
              if (typeof s === 'string')
                  return s.split('');
              else
                  // otherwise we return s:
                  return s;
          }
  
  // Fetch chain csv
  
  
  selection_file = "ressources/cond/selection.csv";
  
  selectionInfo = new TrialHandler({
          psychoJS: psychoJS,
          nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
          extraInfo: expInfo, originPath: undefined,
          trialList: selection_file,
          seed: undefined, name: 'selectionInfo'
      });
  
  selectionInfo = selectionInfo.getTrialList()
  k = 4;
  filename = "ressources/cond/" + tournamentSelection(selectionInfo, k)
  console.log(filename)
  
  chainInfo = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: filename,
      seed: undefined, name: 'chainInfo'});
  
  console.log(chainInfo.getTrialList())
  
  psychoJS.experiment.addData("parent_PID", chainInfo.trialList[0]["PROLIFIC_PID"]);
  
  advice = chainInfo.trialList[0]["msg"]
  
  
  // global variable setup
  
  global_step1_stim_size = [(12 / 34), 0.5];
  global_step1_stimLeft_pos = [(-0.5), 0.09];
  global_step1_stimRight_pos = [0.5, 0.09];
  global_highlight_size = [0.6, 0.75];
  global_step2_highlight_pos = [0, 0.05];
  global_step2_stim_size = [0.4, 0.4];
  global_step2_pos = [0, (- 0.1)];
  global_score = 0;
  global_score_pos = [0.7, 0.4];
  global_score_size = 0.05;
  global_scoreBg_size = [0.3, 0.1];
  global_scoreBg_pos = [0.7, 0.45];
  global_rewardBg_size = [0.4, 0.2];
  global_rewardBg_pos = [0, 0.35];
  p_tooSlow_size = [1.27, 0.5];
  p_tooSlow_pos = [0, 0.5];
  t_tooSlow_size = [0.85, 0.3];
  t_tooSlow_pos = [0, 0.3];
  t_n_trial = 32; //32
  pl_step1_stim_size =  [(9 / 34), 3/8];
  pl_task_stimUp_pos = [0, 0.05];
  pl_step2Bg_size = [9/40, 9/40];
  pl_basket_size = [0.1, 0.1];
  pl_step2LeftBg_pos = [(- 0.5), (- 0.2)];
  pl_step2RightBg_pos = [0.5, (- 0.2)];
  pl2_task_stimLeft_pos = [(- 0.3), 0.1];
  pl2_task_stimRight_pos = [0.3, 0.1];
  pl2_forest_size = [9./30, 9/30];
  pl2_basket_size = [0.15, 0.15];
  
  pl3_step2LeftBg_pos = [(- 0.5), (0)];
  pl3_step2RightBg_pos = [0.5, (0)];
  pl3_task_stimLeft_pos = [(- 0.5), (0)];
  pl3_task_stimRight_pos = [0.5, (0)];
  
  p_index = 0;
  p_score = 0;
  p_basket_names = [["p_green_basket", "ressources/p_step2_stim1.png"], ["p_blue_basket", "ressources/p_step2_stim2.png"]];
  shuffleArray(p_basket_names);
  rmin = 0;
  rmax = 9;
  rmean = ((rmax + rmin) / 2);
  high_reward = [5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9];
  low_reward = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
  l_reward = [high_reward, low_reward];
  shuffleArray(l_reward);
  p_step2_stim1 = {"name": "p_yellow_forest", "file": "ressources/p_step2_background1.png", "deact_file": "ressources/p_step2_background1_deact.png", "basket_name": p_basket_names[0][0], "basket_file": p_basket_names[0][1], "reward": l_reward[0]}
  p_step2_stim2 = {"name": "p_green_forest", "file": "ressources/p_step2_background2.png", "deact_file": "ressources/p_step2_background2_deact.png", "basket_name": p_basket_names[1][0], "basket_file": p_basket_names[1][1], "reward": l_reward[1]}
  p_step1_stim1 = {"name": "p_pink_gnome", "file": "ressources/p_step1_stim1.png", "reward": undefined, "step2": undefined, "pair": undefined, "deact_file": "ressources/p_step1_stim1_deact.png"}
  p_step1_stim2 = {"name": "p_blue_gnome", "file": "ressources/p_step1_stim2.png", "reward": undefined, "step2": undefined, "pair": undefined, "deact_file": "ressources/p_step1_stim2_deact.png"}
  p_step1_stim3 = {"name": "p_green_gnome", "file": "ressources/p_step1_stim3.png", "reward": undefined, "step2": undefined, "pair": undefined, "deact_file": "ressources/p_step1_stim3_deact.png"}
  p_step1_stim4 = {"name": "p_orange_gnome", "file": "ressources/p_step1_stim4.png", "reward": undefined, "step2": undefined, "pair": undefined, "deact_file": "ressources/p_step1_stim4_deact.png"}
  l_p_step1_stims = [p_step1_stim1, p_step1_stim2, p_step1_stim3, p_step1_stim4];
  l_p_step2_stims = [p_step2_stim1, p_step2_stim2];
  pair_num = [1, 1, 2, 2];
  shuffleArray(l_p_step1_stims);
  i = 0;
  for (var p_step1_stim, _pj_c = 0, _pj_a = l_p_step1_stims, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
      p_step1_stim = _pj_a[_pj_c];
      p_step1_stim["pair"] = pair_num[i];
      if (((i === 0) || (i === 2))) {
          p_step1_stim["step2"] = l_p_step2_stims[0];
      } else {
          p_step1_stim["step2"] = l_p_step2_stims[1];
      }
      p_step1_stim["reward"] = p_step1_stim["step2"]["reward"];
      i += 1;
  }
  
  rmin = 0;
  rmax = 9;
  rmean = ((rmax + rmin) / 2);
  high_reward = getRandomIntInRange(Math.ceil(rmean), rmax);
  low_reward = getRandomIntInRange(rmin, Math.floor(rmean));
  l_reward = [high_reward, low_reward];
  shuffleArray(l_reward);
  
  t_step2_stim1 = {
      "name": "bright_forest",
      "file": "ressources/step2_background1.png",
      "deact_file": "ressources/step2_background1_deact.png",
      "basket_name": chainInfo.trialList[0]["bright_forest_basket_name"],
      "basket_file": chainInfo.trialList[0]["bright_forest_basket_file"],
      "reward": l_reward[0]
      }
  t_step2_stim2 = {
      "name": "dark_forest",
      "file": "ressources/step2_background2.png",
      "deact_file": "ressources/step2_background2_deact.png",
      "basket_name": chainInfo.trialList[0]["dark_forest_basket_name"],
      "basket_file": chainInfo.trialList[0]["dark_forest_basket_file"],
      "reward": l_reward[1]
      }
  
  t_step1_stim1 = {"name": chainInfo.trialList[0]["stim1_name"], "file": chainInfo.trialList[0]["stim1_file"], "reward": undefined, "step2": undefined, "pair": chainInfo.trialList[0]["stim1_pair"], "deact_file": chainInfo.trialList[0]["stim1_deact_file"]}
  t_step1_stim2 = {"name": chainInfo.trialList[0]["stim2_name"], "file": chainInfo.trialList[0]["stim2_file"], "reward": undefined, "step2": undefined, "pair": chainInfo.trialList[0]["stim2_pair"], "deact_file": chainInfo.trialList[0]["stim2_deact_file"]}
  t_step1_stim3 = {"name": chainInfo.trialList[0]["stim3_name"], "file": chainInfo.trialList[0]["stim3_file"], "reward": undefined, "step2": undefined, "pair": chainInfo.trialList[0]["stim3_pair"], "deact_file": chainInfo.trialList[0]["stim3_deact_file"]}
  t_step1_stim4 = {"name": chainInfo.trialList[0]["stim4_name"], "file": chainInfo.trialList[0]["stim4_file"], "reward": undefined, "step2": undefined, "pair": chainInfo.trialList[0]["stim4_pair"], "deact_file": chainInfo.trialList[0]["stim4_deact_file"]}
  t_step1_stim5 = {"name": chainInfo.trialList[0]["stim5_name"], "file": chainInfo.trialList[0]["stim5_file"], "reward": undefined, "step2": undefined, "pair": chainInfo.trialList[0]["stim5_pair"], "deact_file": chainInfo.trialList[0]["stim5_deact_file"]}
  t_step1_stim6 = {"name": chainInfo.trialList[0]["stim6_name"], "file": chainInfo.trialList[0]["stim6_file"], "reward": undefined, "step2": undefined, "pair": chainInfo.trialList[0]["stim6_pair"], "deact_file": chainInfo.trialList[0]["stim6_deact_file"]}
  t_step1_stim7 = {"name": chainInfo.trialList[0]["stim7_name"], "file": chainInfo.trialList[0]["stim7_file"], "reward": undefined, "step2": undefined, "pair": chainInfo.trialList[0]["stim7_pair"], "deact_file": chainInfo.trialList[0]["stim7_deact_file"]}
  t_step1_stim8 = {"name": chainInfo.trialList[0]["stim8_name"], "file": chainInfo.trialList[0]["stim8_file"], "reward": undefined, "step2": undefined, "pair": chainInfo.trialList[0]["stim8_pair"], "deact_file": chainInfo.trialList[0]["stim8_deact_file"]}
  
  
  l_t_step1_stims = [t_step1_stim1, t_step1_stim2, t_step1_stim3, t_step1_stim4, t_step1_stim5, t_step1_stim6, t_step1_stim7, t_step1_stim8];
  l_t_step2_stims = [t_step2_stim1, t_step2_stim2];
  
  if ((chainInfo.trialList[0]["stim1_step2_name"] == "bright_forest")) {
      t_step1_stim1["step2"] = t_step2_stim1;
      } else {
      t_step1_stim1["step2"] = t_step2_stim2;
      }
  
  if ((chainInfo.trialList[0]["stim2_step2_name"] == "bright_forest")) {
      t_step1_stim2["step2"] = t_step2_stim1;
      } else {
      t_step1_stim2["step2"] = t_step2_stim2;
      }
  
  if ((chainInfo.trialList[0]["stim3_step2_name"] == "bright_forest")) {
      t_step1_stim3["step2"] = t_step2_stim1;
      } else {
      t_step1_stim3["step2"] = t_step2_stim2;
      }
  
  if ((chainInfo.trialList[0]["stim4_step2_name"] == "bright_forest")) {
      t_step1_stim4["step2"] = t_step2_stim1;
      } else {
      t_step1_stim4["step2"] = t_step2_stim2;
      }
  
  if ((chainInfo.trialList[0]["stim5_step2_name"] == "bright_forest")) {
      t_step1_stim5["step2"] = t_step2_stim1;
      } else {
      t_step1_stim5["step2"] = t_step2_stim2;
      }
  
  if ((chainInfo.trialList[0]["stim6_step2_name"] == "bright_forest")) {
      t_step1_stim6["step2"] = t_step2_stim1;
      } else {
      t_step1_stim6["step2"] = t_step2_stim2;
      }
  
  if ((chainInfo.trialList[0]["stim7_step2_name"] == "bright_forest")) {
      t_step1_stim7["step2"] = t_step2_stim1;
      } else {
      t_step1_stim7["step2"] = t_step2_stim2;
      }
  
  if ((chainInfo.trialList[0]["stim8_step2_name"] == "bright_forest")) {
      t_step1_stim8["step2"] = t_step2_stim1;
      } else {
      t_step1_stim8["step2"] = t_step2_stim2;
      }
  
  p_points = null;
  p_step1_choice = {"name": null, "file": null, "basket_name": null, "basket_file": null, "reward": null};
  p_step2_stim_var = {"name": null, "file": null, "basket_name": null, "basket_file": null, "reward": null};
  t_points = null;
  t_step1_choice = {"name": null, "file": null, "basket_name": null, "basket_file": null, "reward": null};
  t_step2_stim_var = {"name": null, "file": null, "basket_name": null, "basket_file": null, "reward": null};
  p_step1_stimLeft_file = "ressources/mush0.png";
  p_step1_stimRight_file = "ressources/mush0.png";
  p_step2_stimBg_file = "ressources/mush0.png";
  p_step2_stimBasket_file = "ressources/mush0.png";
  
  pl1_index = 0;
  pl1_task_index = [0, 1];
  shuffleArray(pl1_task_index);
  pl1_task_step2LeftStim_var = l_t_step2_stims[pl1_task_index[0]];
  pl1_task_step2RightStim_var = l_t_step2_stims[pl1_task_index[1]];
  stim_num = 1;
  for (var i, _pj_c = 0, _pj_a = l_t_step1_stims, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
      i = _pj_a[_pj_c];
      psychoJS.experiment.addData((("stim" + stim_num.toString()) + "_name"), i["name"]);
      psychoJS.experiment.addData((("stim" + stim_num.toString()) + "_file"), i["file"]);
      psychoJS.experiment.addData((("stim" + stim_num.toString()) + "_pair"), i["pair"]);
      psychoJS.experiment.addData((("stim" + stim_num.toString()) + "_deact_file"), i["deact_file"]);
      psychoJS.experiment.addData((("stim" + stim_num.toString()) + "_step2_name"), i["step2"]["name"]);
      psychoJS.experiment.addData((("stim" + stim_num.toString()) + "_step2_file"), i["step2"]["file"]);
      psychoJS.experiment.addData((("stim" + stim_num.toString()) + "_step2_basket_name"), i["step2"]["basket_name"]);
      psychoJS.experiment.addData((("stim" + stim_num.toString()) + "_step2_basket_file"), i["step2"]["basket_file"]);
      stim_num += 1;
  }
  
  // Initialize components for Routine "consent"
  consentClock = new util.Clock();
  consent_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  consent_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'consent_img', units : 'norm', 
    image : 'ressources/consent.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  // Initialize components for Routine "global_instructions_1"
  global_instructions_1Clock = new util.Clock();
  global_instructions1_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'global_instructions1_img', units : 'norm', 
    image : 'ressources/global_instruction_1.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  global_instructions1_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "global_instructions_2"
  global_instructions_2Clock = new util.Clock();
  global_instructions2_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'global_instructions2_img', units : 'norm', 
    image : 'ressources/global_instruction_2.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  global_instructions2_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "global_instructions_3"
  global_instructions_3Clock = new util.Clock();
  global_instructions3_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'global_instructions3_img', units : 'norm', 
    image : 'ressources/global_instruction_3.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  global_instructions3_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "global_instructions_4"
  global_instructions_4Clock = new util.Clock();
  global_instructions4_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'global_instructions4_img', units : 'norm', 
    image : 'ressources/global_instruction_4.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  global_instructions4_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "stake_instructions"
  stake_instructionsClock = new util.Clock();
  stake_instructions_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'stake_instructions_img', units : 'norm', 
    image : 'ressources/stake_instructions.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  stake_instructions_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "global_instructions5"
  global_instructions5Clock = new util.Clock();
  global_instructions5_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'global_instructions5_img', units : 'norm', 
    image : 'ressources/global_instruction_5.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  global_instructions5_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "t_countdown"
  t_countdownClock = new util.Clock();
  t_countdown_3_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 't_countdown_3_txt',
    text: '3',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.4,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  t_countdown_2_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 't_countdown_2_txt',
    text: '2',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.4,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  t_countdown_1_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 't_countdown_1_txt',
    text: '1',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.4,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "p_setup"
  p_setupClock = new util.Clock();
  // Initialize components for Routine "p_fixation_2"
  p_fixation_2Clock = new util.Clock();
  p_fixation_mandatory2_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'p_fixation_mandatory2_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "p_stake"
  p_stakeClock = new util.Clock();
  p_stake_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'p_stake_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "p_step1"
  p_step1Clock = new util.Clock();
  p_step1_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "ITS"
  ITSClock = new util.Clock();
  ITS_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'ITS_mandatory_txt',
    text: '+',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.3,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([1.0, 1.0, 1.0]),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "p_step2"
  p_step2Clock = new util.Clock();
  p_step2_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "p_reward"
  p_rewardClock = new util.Clock();
  p_reward_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'p_reward_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "p_failStep1"
  p_failStep1Clock = new util.Clock();
  p_failStep1_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'p_failStep1_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  p_failStep1_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "p_failStep2"
  p_failStep2Clock = new util.Clock();
  p_failStep2_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'p_failStep2_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  p_failStep2_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "p_data"
  p_dataClock = new util.Clock();
  // Initialize components for Routine "t_instructions"
  t_instructionsClock = new util.Clock();
  t_instructions_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 't_instructions_img', units : 'norm', 
    image : 'ressources/t_instructions_1.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  t_instructions_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "t_advice_reading"
  t_advice_readingClock = new util.Clock();
  t_advice_textbox = new visual.TextBox({
    win: psychoJS.window,
    name: 't_advice_textbox',
    text: advice,
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [(- 0.85), 0.45], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [1.3, 0.9],  units: 'height', 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: [0.85, 0.85, 0.85], borderColor: [(- 1.0), (- 1.0), (- 1.0)],
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.05,
    alignment: 'top-left',
    overflow: 'hidden',
    editable: false,
    multiline: true,
    anchor: 'top-left',
    depth: 0.0 
  });
  
  t_advice_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  t_advice_mouse.mouseClock = new util.Clock();
  t_advice_finished_typing_rect = new visual.Rect ({
    win: psychoJS.window, name: 't_advice_finished_typing_rect', units : 'height', 
    width: [0.3, 0.15][0], height: [0.3, 0.15][1],
    ori: 0.0, pos: [0.67, (- 0.35)],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),
    fillColor: new util.Color([1.0, 1.0, 1.0]),
    opacity: undefined, depth: -2, interpolate: true,
  });
  
  t_advice_finished_typing_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 't_advice_finished_typing_txt',
    text: 'Click here when you \n   are done reading',
    font: 'Open Sans',
    units: 'height', 
    pos: [0.67, (- 0.35)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "t_advice_summary"
  t_advice_summaryClock = new util.Clock();
  t_advice_summary_textbox = new visual.TextBox({
    win: psychoJS.window,
    name: 't_advice_summary_textbox',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [(- 0.85), 0.35], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [1.3, 0.8],  units: 'height', 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: [0.85, 0.85, 0.85], borderColor: [(- 1.0), (- 1.0), (- 1.0)],
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.05,
    alignment: 'top-left',
    overflow: 'hidden',
    editable: true,
    multiline: true,
    anchor: 'top-left',
    depth: 0.0 
  });
  
  t_advice_summary_finished_typing_rect = new visual.Rect ({
    win: psychoJS.window, name: 't_advice_summary_finished_typing_rect', units : 'height', 
    width: [0.3, 0.15][0], height: [0.3, 0.15][1],
    ori: 0.0, pos: [0.67, (- 0.35)],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),
    fillColor: new util.Color([1.0, 1.0, 1.0]),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  t_advice_summary_finished_typing_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 't_advice_summary_finished_typing_txt',
    text: 'Click here when you \n   are done typing',
    font: 'Open Sans',
    units: 'height', 
    pos: [0.67, (- 0.35)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -2.0 
  });
  
  t_advice_summary_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 't_advice_summary_txt',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0.67, 0.38], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  t_advice_summary_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  t_advice_summary_mouse.mouseClock = new util.Clock();
  t_advice_summary_instructinos = new visual.TextStim({
    win: psychoJS.window,
    name: 't_advice_summary_instructinos',
    text: 'Please write a summary of the advice you just read in your own words:',
    font: 'Open Sans',
    units: 'height', 
    pos: [(- 0.22), 0.44], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -6.0 
  });
  
  // Initialize components for Routine "t_instructions_2"
  t_instructions_2Clock = new util.Clock();
  t_instructions_2_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 't_instructions_2_img', units : 'norm', 
    image : 'ressources/t_instructions_2.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  t_instructions_2_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "t_setup"
  t_setupClock = new util.Clock();
  // Initialize components for Routine "t_fixation"
  t_fixationClock = new util.Clock();
  t_fixation_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 't_fixation_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "t_stake"
  t_stakeClock = new util.Clock();
  t_stake_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 't_stake_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "t_step1"
  t_step1Clock = new util.Clock();
  t_step1_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "t_step2"
  t_step2Clock = new util.Clock();
  t_step2_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "t_reward"
  t_rewardClock = new util.Clock();
  t_reward_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 't_reward_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "t_failStep1"
  t_failStep1Clock = new util.Clock();
  t_failStep1_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 't_failStep1_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "t_failStep2"
  t_failStep2Clock = new util.Clock();
  t_failStep2_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 't_failStep2_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "t_data"
  t_dataClock = new util.Clock();
  // Initialize components for Routine "t_break"
  t_breakClock = new util.Clock();
  myClock = new util.Clock();
  
  break_key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  t_break_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 't_break_img', units : 'norm', 
    image : 'ressources/break.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  t_break_advice_textbox = new visual.TextBox({
    win: psychoJS.window,
    name: 't_break_advice_textbox',
    text: advice,
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [(- 0.75), 0.25], 
    letterHeight: 0.02,
    lineSpacing: 1.0,
    size: [1.5, 0.65],  units: 'height', 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: [0.85, 0.85, 0.85], borderColor: [(- 1.0), (- 1.0), (- 1.0)],
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.05,
    alignment: 'top-left',
    overflow: 'hidden',
    editable: false,
    multiline: true,
    anchor: 'top-left',
    depth: -3.0 
  });
  
  t_break_clock_text = new visual.TextStim({
    win: psychoJS.window,
    name: 't_break_clock_text',
    text: ' ',
    font: 'Open Sans',
    units: 'height', 
    pos: [0.7, 0.38], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([1.0, 1.0, 1.0]),  opacity: undefined,
    depth: -4.0 
  });
  
  // Initialize components for Routine "pl_global_instructions"
  pl_global_instructionsClock = new util.Clock();
  pl_global_instructions_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pl_global_instructions_img', units : 'norm', 
    image : 'ressources/pl_global_instructions.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  pl_global_instructions_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "vb_instructions"
  vb_instructionsClock = new util.Clock();
  vb_instructions_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'vb_instructions_img', units : 'norm', 
    image : 'ressources/vb_instructions.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  vb_instructions_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "vb_instructions_2"
  vb_instructions_2Clock = new util.Clock();
  vb_instructions_2_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'vb_instructions_2_img', units : 'norm', 
    image : 'ressources/vb_instructions_2.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  vb_instructions_2_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "verbal_transmission"
  verbal_transmissionClock = new util.Clock();
  vb_textbox = new visual.TextBox({
    win: psychoJS.window,
    name: 'vb_textbox',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [(- 0.85), 0.45], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [1.3, 0.9],  units: 'height', 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: [0.85, 0.85, 0.85], borderColor: [(- 1.0), (- 1.0), (- 1.0)],
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.05,
    alignment: 'top-left',
    overflow: 'hidden',
    editable: true,
    multiline: true,
    anchor: 'top-left',
    depth: 0.0 
  });
  
  vb_finished_typing_rect = new visual.Rect ({
    win: psychoJS.window, name: 'vb_finished_typing_rect', units : 'height', 
    width: [0.3, 0.15][0], height: [0.3, 0.15][1],
    ori: 0.0, pos: [0.67, (- 0.35)],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),
    fillColor: new util.Color([1.0, 1.0, 1.0]),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  vb_finished_typing_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'vb_finished_typing_txt',
    text: 'Click here when you \n   are done typing',
    font: 'Open Sans',
    units: 'height', 
    pos: [0.67, (- 0.35)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -2.0 
  });
  
  vb_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'vb_txt',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0.67, 0.38], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  vb_mouse = new core.Mouse({
    win: psychoJS.window,
  });
  vb_mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "pl1_instructions_1"
  pl1_instructions_1Clock = new util.Clock();
  pl1_instructions1_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pl1_instructions1_img', units : 'norm', 
    image : 'ressources/pl1_instructions_1.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  pl1_instructions1_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "pl1_instructions_2"
  pl1_instructions_2Clock = new util.Clock();
  pl1_instructions2_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pl1_instructions2_img', units : 'norm', 
    image : 'ressources/pl1_instructions_2.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  pl1_instructions2_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "pl1_instructions_3"
  pl1_instructions_3Clock = new util.Clock();
  pl1_instructions3_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pl1_instructions3_img', units : 'norm', 
    image : 'ressources/pl1_instructions_3.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  pl1_instructions3_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "pl1_instructions_4"
  pl1_instructions_4Clock = new util.Clock();
  pl1_instructions4_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pl1_instructions4_img', units : 'norm', 
    image : 'ressources/pl1_instructions_4.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  pl1_instructions4_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "pl1_setup"
  pl1_setupClock = new util.Clock();
  // Initialize components for Routine "pl1_task"
  pl1_taskClock = new util.Clock();
  pl1_task_lickert = new visual.Slider({
    win: psychoJS.window, name: 'pl1_task_lickert',
    startValue: 50,
    size: [1.0, 0.05], pos: [0, (- 0.19)], ori: 0.0, units: psychoJS.window.units,
    labels: ["0\n(never together)", "100\n(always together)"], fontSize: 0.05, ticks: [0, 100],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color('White'), markerColor: new util.Color('Red'), lineColor: new util.Color('White'), 
    opacity: undefined, fontFamily: 'Open Sans', bold: true, italic: false, depth: 0, 
    flip: true,
  });
  
  pl1_task_confidence_lickert = new visual.Slider({
    win: psychoJS.window, name: 'pl1_task_confidence_lickert',
    startValue: 50,
    size: [1.0, 0.05], pos: [0, (- 0.45)], ori: 0.0, units: psychoJS.window.units,
    labels: ["0\n(not confident at all)", "100\n(very confident)"], fontSize: 0.05, ticks: [0, 100],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color('White'), markerColor: new util.Color('Red'), lineColor: new util.Color('White'), 
    opacity: undefined, fontFamily: 'Open Sans', bold: true, italic: false, depth: -1, 
    flip: true,
  });
  
  pl1_task_stimLeft_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pl1_task_stimLeft_img', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'bottom-center',
    ori : 0.0, pos : pl2_task_stimLeft_pos, size : pl_step1_stim_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  pl1_task_stimRight_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pl1_task_stimRight_img', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'bottom-center',
    ori : 0.0, pos : pl2_task_stimRight_pos, size : pl_step1_stim_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  pl1_task_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  pl1_task_fixation_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'pl1_task_fixation_txt',
    text: '+',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.3,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  // Initialize components for Routine "pl1_data"
  pl1_dataClock = new util.Clock();
  // Initialize components for Routine "pl2_instructions"
  pl2_instructionsClock = new util.Clock();
  pl2_instructions_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pl2_instructions_img', units : 'norm', 
    image : 'ressources/pl2_instructions.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  pl2_instructions_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "pl2_setup"
  pl2_setupClock = new util.Clock();
  // Initialize components for Routine "pl2_task"
  pl2_taskClock = new util.Clock();
  pl2_task_lickert = new visual.Slider({
    win: psychoJS.window, name: 'pl2_task_lickert',
    startValue: 50,
    size: [1.0, 0.05], pos: [0, (- 0.19)], ori: 0.0, units: psychoJS.window.units,
    labels: ["0\n(never led to)", "100\n(always led to)"], fontSize: 0.05, ticks: [0, 100],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color('White'), markerColor: new util.Color('Red'), lineColor: new util.Color('White'), 
    opacity: undefined, fontFamily: 'Open Sans', bold: true, italic: false, depth: 0, 
    flip: true,
  });
  
  pl2_task_confidence_lickert = new visual.Slider({
    win: psychoJS.window, name: 'pl2_task_confidence_lickert',
    startValue: 50,
    size: [1.0, 0.05], pos: [0, (- 0.45)], ori: 0.0, units: psychoJS.window.units,
    labels: ["0\n(not confident at all)", "100\n(very confident)"], fontSize: 0.05, ticks: [0, 100],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color('White'), markerColor: new util.Color('Red'), lineColor: new util.Color('White'), 
    opacity: undefined, fontFamily: 'Open Sans', bold: true, italic: false, depth: -1, 
    flip: true,
  });
  
  pl2_task_gnome_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pl2_task_gnome_img', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'bottom-center',
    ori : 0.0, pos : pl2_task_stimLeft_pos, size : pl_step1_stim_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  pl2_task_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  pl2_task_forest_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pl2_task_forest_img', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'bottom-center',
    ori : 0.0, pos : pl2_task_stimRight_pos, size : pl2_forest_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  pl2_task_basket_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pl2_task_basket_img', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'bottom-center',
    ori : 0.0, pos : pl2_task_stimRight_pos, size : pl2_basket_size,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  pl2_task_fixation_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'pl2_task_fixation_txt',
    text: '+',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.3,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  // Initialize components for Routine "pl2_data"
  pl2_dataClock = new util.Clock();
  // Initialize components for Routine "end"
  endClock = new util.Clock();
  end_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'end_txt',
    text: 'We thank you for your participation in this experiment!\n\nYour Prolific completion code: C1KDRF07\n\nPress "space" to get back to the main Prolific webpage',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  end_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "no_consent_screen"
  no_consent_screenClock = new util.Clock();
  no_consent_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'no_consent_txt',
    text: 'We acknowledge that you chose not to participate in the experiment. \nYour decision is respected, and your data will not be used. \nIf you have any questions, feel free to reach out. Thank you.\n\nPlease press "escape" and close the tab to end the experiment.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var global_setupComponents;
function global_setupRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'global_setup' ---
    t = 0;
    global_setupClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    global_setupComponents = [];
    
    global_setupComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function global_setupRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'global_setup' ---
    // get current time
    t = global_setupClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    global_setupComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function global_setupRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'global_setup' ---
    global_setupComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "global_setup" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _consent_keyresp_allKeys;
var flag_consent;
var flag_no_consent;
var consentComponents;
function consentRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'consent' ---
    t = 0;
    consentClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    consent_keyresp.keys = undefined;
    consent_keyresp.rt = undefined;
    _consent_keyresp_allKeys = [];
    flag_consent = false;
    flag_no_consent = false;
    // keep track of which components have finished
    consentComponents = [];
    consentComponents.push(consent_keyresp);
    consentComponents.push(consent_img);
    
    consentComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function consentRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'consent' ---
    // get current time
    t = consentClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *consent_keyresp* updates
    if (t >= 0.0 && consent_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      consent_keyresp.tStart = t;  // (not accounting for frame time here)
      consent_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      consent_keyresp.clock.reset();
      consent_keyresp.start();
      consent_keyresp.clearEvents();
    }
    
    if (consent_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = consent_keyresp.getKeys({keyList: ['y', 'n'], waitRelease: false});
      _consent_keyresp_allKeys = _consent_keyresp_allKeys.concat(theseKeys);
      if (_consent_keyresp_allKeys.length > 0) {
        consent_keyresp.keys = _consent_keyresp_allKeys[_consent_keyresp_allKeys.length - 1].name;  // just the last key pressed
        consent_keyresp.rt = _consent_keyresp_allKeys[_consent_keyresp_allKeys.length - 1].rt;
        consent_keyresp.duration = _consent_keyresp_allKeys[_consent_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *consent_img* updates
    if (t >= 0.0 && consent_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      consent_img.tStart = t;  // (not accounting for frame time here)
      consent_img.frameNStart = frameN;  // exact frame index
      
      consent_img.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    consentComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function consentRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'consent' ---
    consentComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(consent_keyresp.corr, level);
    }
    psychoJS.experiment.addData('consent_keyresp.keys', consent_keyresp.keys);
    if (typeof consent_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('consent_keyresp.rt', consent_keyresp.rt);
        psychoJS.experiment.addData('consent_keyresp.duration', consent_keyresp.duration);
        routineTimer.reset();
        }
    
    consent_keyresp.stop();
    if ((consent_keyresp.keys === "y")) {
        flag_consent = true;
    } else {
        flag_no_consent = true;
    }
    
    // the Routine "consent" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var show_trials;
function show_trialsLoopBegin(show_trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    show_trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: flag_consent, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'show_trials'
    });
    psychoJS.experiment.addLoop(show_trials); // add the loop to the experiment
    currentLoop = show_trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    show_trials.forEach(function() {
      snapshot = show_trials.getSnapshot();
    
      show_trialsLoopScheduler.add(importConditions(snapshot));
      show_trialsLoopScheduler.add(global_instructions_1RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(global_instructions_1RoutineEachFrame());
      show_trialsLoopScheduler.add(global_instructions_1RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(global_instructions_2RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(global_instructions_2RoutineEachFrame());
      show_trialsLoopScheduler.add(global_instructions_2RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(global_instructions_3RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(global_instructions_3RoutineEachFrame());
      show_trialsLoopScheduler.add(global_instructions_3RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(global_instructions_4RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(global_instructions_4RoutineEachFrame());
      show_trialsLoopScheduler.add(global_instructions_4RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(stake_instructionsRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(stake_instructionsRoutineEachFrame());
      show_trialsLoopScheduler.add(stake_instructionsRoutineEnd(snapshot));
      show_trialsLoopScheduler.add(global_instructions5RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(global_instructions5RoutineEachFrame());
      show_trialsLoopScheduler.add(global_instructions5RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(t_countdownRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(t_countdownRoutineEachFrame());
      show_trialsLoopScheduler.add(t_countdownRoutineEnd(snapshot));
      const practiceLoopScheduler = new Scheduler(psychoJS);
      show_trialsLoopScheduler.add(practiceLoopBegin(practiceLoopScheduler, snapshot));
      show_trialsLoopScheduler.add(practiceLoopScheduler);
      show_trialsLoopScheduler.add(practiceLoopEnd);
      show_trialsLoopScheduler.add(t_instructionsRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(t_instructionsRoutineEachFrame());
      show_trialsLoopScheduler.add(t_instructionsRoutineEnd(snapshot));
      show_trialsLoopScheduler.add(t_advice_readingRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(t_advice_readingRoutineEachFrame());
      show_trialsLoopScheduler.add(t_advice_readingRoutineEnd(snapshot));
      show_trialsLoopScheduler.add(t_advice_summaryRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(t_advice_summaryRoutineEachFrame());
      show_trialsLoopScheduler.add(t_advice_summaryRoutineEnd(snapshot));
      show_trialsLoopScheduler.add(t_instructions_2RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(t_instructions_2RoutineEachFrame());
      show_trialsLoopScheduler.add(t_instructions_2RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(t_countdownRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(t_countdownRoutineEachFrame());
      show_trialsLoopScheduler.add(t_countdownRoutineEnd(snapshot));
      const trialsLoopScheduler = new Scheduler(psychoJS);
      show_trialsLoopScheduler.add(trialsLoopBegin(trialsLoopScheduler, snapshot));
      show_trialsLoopScheduler.add(trialsLoopScheduler);
      show_trialsLoopScheduler.add(trialsLoopEnd);
      show_trialsLoopScheduler.add(pl_global_instructionsRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(pl_global_instructionsRoutineEachFrame());
      show_trialsLoopScheduler.add(pl_global_instructionsRoutineEnd(snapshot));
      show_trialsLoopScheduler.add(vb_instructionsRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(vb_instructionsRoutineEachFrame());
      show_trialsLoopScheduler.add(vb_instructionsRoutineEnd(snapshot));
      show_trialsLoopScheduler.add(t_advice_readingRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(t_advice_readingRoutineEachFrame());
      show_trialsLoopScheduler.add(t_advice_readingRoutineEnd(snapshot));
      show_trialsLoopScheduler.add(vb_instructions_2RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(vb_instructions_2RoutineEachFrame());
      show_trialsLoopScheduler.add(vb_instructions_2RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(verbal_transmissionRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(verbal_transmissionRoutineEachFrame());
      show_trialsLoopScheduler.add(verbal_transmissionRoutineEnd(snapshot));
      show_trialsLoopScheduler.add(pl1_instructions_1RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(pl1_instructions_1RoutineEachFrame());
      show_trialsLoopScheduler.add(pl1_instructions_1RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(pl1_instructions_2RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(pl1_instructions_2RoutineEachFrame());
      show_trialsLoopScheduler.add(pl1_instructions_2RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(pl1_instructions_3RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(pl1_instructions_3RoutineEachFrame());
      show_trialsLoopScheduler.add(pl1_instructions_3RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(pl1_instructions_4RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(pl1_instructions_4RoutineEachFrame());
      show_trialsLoopScheduler.add(pl1_instructions_4RoutineEnd(snapshot));
      const pl1_loopLoopScheduler = new Scheduler(psychoJS);
      show_trialsLoopScheduler.add(pl1_loopLoopBegin(pl1_loopLoopScheduler, snapshot));
      show_trialsLoopScheduler.add(pl1_loopLoopScheduler);
      show_trialsLoopScheduler.add(pl1_loopLoopEnd);
      show_trialsLoopScheduler.add(pl2_instructionsRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(pl2_instructionsRoutineEachFrame());
      show_trialsLoopScheduler.add(pl2_instructionsRoutineEnd(snapshot));
      const pl2_loopLoopScheduler = new Scheduler(psychoJS);
      show_trialsLoopScheduler.add(pl2_loopLoopBegin(pl2_loopLoopScheduler, snapshot));
      show_trialsLoopScheduler.add(pl2_loopLoopScheduler);
      show_trialsLoopScheduler.add(pl2_loopLoopEnd);
      show_trialsLoopScheduler.add(endRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(endRoutineEachFrame());
      show_trialsLoopScheduler.add(endRoutineEnd(snapshot));
      show_trialsLoopScheduler.add(show_trialsLoopEndIteration(show_trialsLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var practice;
function practiceLoopBegin(practiceLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    practice = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 5, method: TrialHandler.Method.FULLRANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'training_pairIndex.csv',
      seed: undefined, name: 'practice'
    });
    psychoJS.experiment.addLoop(practice); // add the loop to the experiment
    currentLoop = practice;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    practice.forEach(function() {
      snapshot = practice.getSnapshot();
    
      practiceLoopScheduler.add(importConditions(snapshot));
      practiceLoopScheduler.add(p_setupRoutineBegin(snapshot));
      practiceLoopScheduler.add(p_setupRoutineEachFrame());
      practiceLoopScheduler.add(p_setupRoutineEnd(snapshot));
      practiceLoopScheduler.add(p_fixation_2RoutineBegin(snapshot));
      practiceLoopScheduler.add(p_fixation_2RoutineEachFrame());
      practiceLoopScheduler.add(p_fixation_2RoutineEnd(snapshot));
      practiceLoopScheduler.add(p_stakeRoutineBegin(snapshot));
      practiceLoopScheduler.add(p_stakeRoutineEachFrame());
      practiceLoopScheduler.add(p_stakeRoutineEnd(snapshot));
      practiceLoopScheduler.add(p_step1RoutineBegin(snapshot));
      practiceLoopScheduler.add(p_step1RoutineEachFrame());
      practiceLoopScheduler.add(p_step1RoutineEnd(snapshot));
      const p_step2_loopLoopScheduler = new Scheduler(psychoJS);
      practiceLoopScheduler.add(p_step2_loopLoopBegin(p_step2_loopLoopScheduler, snapshot));
      practiceLoopScheduler.add(p_step2_loopLoopScheduler);
      practiceLoopScheduler.add(p_step2_loopLoopEnd);
      const p_reward_loopLoopScheduler = new Scheduler(psychoJS);
      practiceLoopScheduler.add(p_reward_loopLoopBegin(p_reward_loopLoopScheduler, snapshot));
      practiceLoopScheduler.add(p_reward_loopLoopScheduler);
      practiceLoopScheduler.add(p_reward_loopLoopEnd);
      const p_failStep1_loopLoopScheduler = new Scheduler(psychoJS);
      practiceLoopScheduler.add(p_failStep1_loopLoopBegin(p_failStep1_loopLoopScheduler, snapshot));
      practiceLoopScheduler.add(p_failStep1_loopLoopScheduler);
      practiceLoopScheduler.add(p_failStep1_loopLoopEnd);
      const p_failStep2_loopLoopScheduler = new Scheduler(psychoJS);
      practiceLoopScheduler.add(p_failStep2_loopLoopBegin(p_failStep2_loopLoopScheduler, snapshot));
      practiceLoopScheduler.add(p_failStep2_loopLoopScheduler);
      practiceLoopScheduler.add(p_failStep2_loopLoopEnd);
      practiceLoopScheduler.add(p_dataRoutineBegin(snapshot));
      practiceLoopScheduler.add(p_dataRoutineEachFrame());
      practiceLoopScheduler.add(p_dataRoutineEnd(snapshot));
      practiceLoopScheduler.add(practiceLoopEndIteration(practiceLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var p_step2_loop;
function p_step2_loopLoopBegin(p_step2_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    p_step2_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: p_step2_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'p_step2_loop'
    });
    psychoJS.experiment.addLoop(p_step2_loop); // add the loop to the experiment
    currentLoop = p_step2_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    p_step2_loop.forEach(function() {
      snapshot = p_step2_loop.getSnapshot();
    
      p_step2_loopLoopScheduler.add(importConditions(snapshot));
      p_step2_loopLoopScheduler.add(ITSRoutineBegin(snapshot));
      p_step2_loopLoopScheduler.add(ITSRoutineEachFrame());
      p_step2_loopLoopScheduler.add(ITSRoutineEnd(snapshot));
      p_step2_loopLoopScheduler.add(p_step2RoutineBegin(snapshot));
      p_step2_loopLoopScheduler.add(p_step2RoutineEachFrame());
      p_step2_loopLoopScheduler.add(p_step2RoutineEnd(snapshot));
      p_step2_loopLoopScheduler.add(p_step2_loopLoopEndIteration(p_step2_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function p_step2_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(p_step2_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function p_step2_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var p_reward_loop;
function p_reward_loopLoopBegin(p_reward_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    p_reward_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: p_reward_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'p_reward_loop'
    });
    psychoJS.experiment.addLoop(p_reward_loop); // add the loop to the experiment
    currentLoop = p_reward_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    p_reward_loop.forEach(function() {
      snapshot = p_reward_loop.getSnapshot();
    
      p_reward_loopLoopScheduler.add(importConditions(snapshot));
      p_reward_loopLoopScheduler.add(p_rewardRoutineBegin(snapshot));
      p_reward_loopLoopScheduler.add(p_rewardRoutineEachFrame());
      p_reward_loopLoopScheduler.add(p_rewardRoutineEnd(snapshot));
      p_reward_loopLoopScheduler.add(p_reward_loopLoopEndIteration(p_reward_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function p_reward_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(p_reward_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function p_reward_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var p_failStep1_loop;
function p_failStep1_loopLoopBegin(p_failStep1_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    p_failStep1_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: p_failStep1_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'p_failStep1_loop'
    });
    psychoJS.experiment.addLoop(p_failStep1_loop); // add the loop to the experiment
    currentLoop = p_failStep1_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    p_failStep1_loop.forEach(function() {
      snapshot = p_failStep1_loop.getSnapshot();
    
      p_failStep1_loopLoopScheduler.add(importConditions(snapshot));
      p_failStep1_loopLoopScheduler.add(p_failStep1RoutineBegin(snapshot));
      p_failStep1_loopLoopScheduler.add(p_failStep1RoutineEachFrame());
      p_failStep1_loopLoopScheduler.add(p_failStep1RoutineEnd(snapshot));
      p_failStep1_loopLoopScheduler.add(p_failStep1_loopLoopEndIteration(p_failStep1_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function p_failStep1_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(p_failStep1_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function p_failStep1_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var p_failStep2_loop;
function p_failStep2_loopLoopBegin(p_failStep2_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    p_failStep2_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: p_failStep2_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'p_failStep2_loop'
    });
    psychoJS.experiment.addLoop(p_failStep2_loop); // add the loop to the experiment
    currentLoop = p_failStep2_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    p_failStep2_loop.forEach(function() {
      snapshot = p_failStep2_loop.getSnapshot();
    
      p_failStep2_loopLoopScheduler.add(importConditions(snapshot));
      p_failStep2_loopLoopScheduler.add(p_failStep2RoutineBegin(snapshot));
      p_failStep2_loopLoopScheduler.add(p_failStep2RoutineEachFrame());
      p_failStep2_loopLoopScheduler.add(p_failStep2RoutineEnd(snapshot));
      p_failStep2_loopLoopScheduler.add(p_failStep2_loopLoopEndIteration(p_failStep2_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function p_failStep2_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(p_failStep2_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function p_failStep2_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function practiceLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(practice);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function practiceLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: t_n_trial, method: TrialHandler.Method.FULLRANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'trials_pairIndex.csv',
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    trials.forEach(function() {
      snapshot = trials.getSnapshot();
    
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(t_setupRoutineBegin(snapshot));
      trialsLoopScheduler.add(t_setupRoutineEachFrame());
      trialsLoopScheduler.add(t_setupRoutineEnd(snapshot));
      trialsLoopScheduler.add(t_fixationRoutineBegin(snapshot));
      trialsLoopScheduler.add(t_fixationRoutineEachFrame());
      trialsLoopScheduler.add(t_fixationRoutineEnd(snapshot));
      trialsLoopScheduler.add(t_stakeRoutineBegin(snapshot));
      trialsLoopScheduler.add(t_stakeRoutineEachFrame());
      trialsLoopScheduler.add(t_stakeRoutineEnd(snapshot));
      trialsLoopScheduler.add(t_step1RoutineBegin(snapshot));
      trialsLoopScheduler.add(t_step1RoutineEachFrame());
      trialsLoopScheduler.add(t_step1RoutineEnd(snapshot));
      const t_step2_loopLoopScheduler = new Scheduler(psychoJS);
      trialsLoopScheduler.add(t_step2_loopLoopBegin(t_step2_loopLoopScheduler, snapshot));
      trialsLoopScheduler.add(t_step2_loopLoopScheduler);
      trialsLoopScheduler.add(t_step2_loopLoopEnd);
      const t_reward_loopLoopScheduler = new Scheduler(psychoJS);
      trialsLoopScheduler.add(t_reward_loopLoopBegin(t_reward_loopLoopScheduler, snapshot));
      trialsLoopScheduler.add(t_reward_loopLoopScheduler);
      trialsLoopScheduler.add(t_reward_loopLoopEnd);
      const t_failStep1_loopLoopScheduler = new Scheduler(psychoJS);
      trialsLoopScheduler.add(t_failStep1_loopLoopBegin(t_failStep1_loopLoopScheduler, snapshot));
      trialsLoopScheduler.add(t_failStep1_loopLoopScheduler);
      trialsLoopScheduler.add(t_failStep1_loopLoopEnd);
      const t_failStep2_loopLoopScheduler = new Scheduler(psychoJS);
      trialsLoopScheduler.add(t_failStep2_loopLoopBegin(t_failStep2_loopLoopScheduler, snapshot));
      trialsLoopScheduler.add(t_failStep2_loopLoopScheduler);
      trialsLoopScheduler.add(t_failStep2_loopLoopEnd);
      trialsLoopScheduler.add(t_dataRoutineBegin(snapshot));
      trialsLoopScheduler.add(t_dataRoutineEachFrame());
      trialsLoopScheduler.add(t_dataRoutineEnd(snapshot));
      const t_break_loopLoopScheduler = new Scheduler(psychoJS);
      trialsLoopScheduler.add(t_break_loopLoopBegin(t_break_loopLoopScheduler, snapshot));
      trialsLoopScheduler.add(t_break_loopLoopScheduler);
      trialsLoopScheduler.add(t_break_loopLoopEnd);
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var t_step2_loop;
function t_step2_loopLoopBegin(t_step2_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    t_step2_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: t_step2_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 't_step2_loop'
    });
    psychoJS.experiment.addLoop(t_step2_loop); // add the loop to the experiment
    currentLoop = t_step2_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    t_step2_loop.forEach(function() {
      snapshot = t_step2_loop.getSnapshot();
    
      t_step2_loopLoopScheduler.add(importConditions(snapshot));
      t_step2_loopLoopScheduler.add(ITSRoutineBegin(snapshot));
      t_step2_loopLoopScheduler.add(ITSRoutineEachFrame());
      t_step2_loopLoopScheduler.add(ITSRoutineEnd(snapshot));
      t_step2_loopLoopScheduler.add(t_step2RoutineBegin(snapshot));
      t_step2_loopLoopScheduler.add(t_step2RoutineEachFrame());
      t_step2_loopLoopScheduler.add(t_step2RoutineEnd(snapshot));
      t_step2_loopLoopScheduler.add(t_step2_loopLoopEndIteration(t_step2_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function t_step2_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(t_step2_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function t_step2_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var t_reward_loop;
function t_reward_loopLoopBegin(t_reward_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    t_reward_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: t_reward_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 't_reward_loop'
    });
    psychoJS.experiment.addLoop(t_reward_loop); // add the loop to the experiment
    currentLoop = t_reward_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    t_reward_loop.forEach(function() {
      snapshot = t_reward_loop.getSnapshot();
    
      t_reward_loopLoopScheduler.add(importConditions(snapshot));
      t_reward_loopLoopScheduler.add(t_rewardRoutineBegin(snapshot));
      t_reward_loopLoopScheduler.add(t_rewardRoutineEachFrame());
      t_reward_loopLoopScheduler.add(t_rewardRoutineEnd(snapshot));
      t_reward_loopLoopScheduler.add(t_reward_loopLoopEndIteration(t_reward_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function t_reward_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(t_reward_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function t_reward_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var t_failStep1_loop;
function t_failStep1_loopLoopBegin(t_failStep1_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    t_failStep1_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: t_failStep1_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 't_failStep1_loop'
    });
    psychoJS.experiment.addLoop(t_failStep1_loop); // add the loop to the experiment
    currentLoop = t_failStep1_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    t_failStep1_loop.forEach(function() {
      snapshot = t_failStep1_loop.getSnapshot();
    
      t_failStep1_loopLoopScheduler.add(importConditions(snapshot));
      t_failStep1_loopLoopScheduler.add(t_failStep1RoutineBegin(snapshot));
      t_failStep1_loopLoopScheduler.add(t_failStep1RoutineEachFrame());
      t_failStep1_loopLoopScheduler.add(t_failStep1RoutineEnd(snapshot));
      t_failStep1_loopLoopScheduler.add(t_failStep1_loopLoopEndIteration(t_failStep1_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function t_failStep1_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(t_failStep1_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function t_failStep1_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var t_failStep2_loop;
function t_failStep2_loopLoopBegin(t_failStep2_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    t_failStep2_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: t_failStep2_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 't_failStep2_loop'
    });
    psychoJS.experiment.addLoop(t_failStep2_loop); // add the loop to the experiment
    currentLoop = t_failStep2_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    t_failStep2_loop.forEach(function() {
      snapshot = t_failStep2_loop.getSnapshot();
    
      t_failStep2_loopLoopScheduler.add(importConditions(snapshot));
      t_failStep2_loopLoopScheduler.add(t_failStep2RoutineBegin(snapshot));
      t_failStep2_loopLoopScheduler.add(t_failStep2RoutineEachFrame());
      t_failStep2_loopLoopScheduler.add(t_failStep2RoutineEnd(snapshot));
      t_failStep2_loopLoopScheduler.add(t_failStep2_loopLoopEndIteration(t_failStep2_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function t_failStep2_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(t_failStep2_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function t_failStep2_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var t_break_loop;
function t_break_loopLoopBegin(t_break_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    t_break_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: t_break_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 't_break_loop'
    });
    psychoJS.experiment.addLoop(t_break_loop); // add the loop to the experiment
    currentLoop = t_break_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    t_break_loop.forEach(function() {
      snapshot = t_break_loop.getSnapshot();
    
      t_break_loopLoopScheduler.add(importConditions(snapshot));
      t_break_loopLoopScheduler.add(t_breakRoutineBegin(snapshot));
      t_break_loopLoopScheduler.add(t_breakRoutineEachFrame());
      t_break_loopLoopScheduler.add(t_breakRoutineEnd(snapshot));
      t_break_loopLoopScheduler.add(t_countdownRoutineBegin(snapshot));
      t_break_loopLoopScheduler.add(t_countdownRoutineEachFrame());
      t_break_loopLoopScheduler.add(t_countdownRoutineEnd(snapshot));
      t_break_loopLoopScheduler.add(t_break_loopLoopEndIteration(t_break_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function t_break_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(t_break_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function t_break_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var pl1_loop;
function pl1_loopLoopBegin(pl1_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    pl1_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'pl1.xlsx',
      seed: undefined, name: 'pl1_loop'
    });
    psychoJS.experiment.addLoop(pl1_loop); // add the loop to the experiment
    currentLoop = pl1_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    pl1_loop.forEach(function() {
      snapshot = pl1_loop.getSnapshot();
    
      pl1_loopLoopScheduler.add(importConditions(snapshot));
      pl1_loopLoopScheduler.add(pl1_setupRoutineBegin(snapshot));
      pl1_loopLoopScheduler.add(pl1_setupRoutineEachFrame());
      pl1_loopLoopScheduler.add(pl1_setupRoutineEnd(snapshot));
      pl1_loopLoopScheduler.add(pl1_taskRoutineBegin(snapshot));
      pl1_loopLoopScheduler.add(pl1_taskRoutineEachFrame());
      pl1_loopLoopScheduler.add(pl1_taskRoutineEnd(snapshot));
      pl1_loopLoopScheduler.add(pl1_dataRoutineBegin(snapshot));
      pl1_loopLoopScheduler.add(pl1_dataRoutineEachFrame());
      pl1_loopLoopScheduler.add(pl1_dataRoutineEnd(snapshot));
      pl1_loopLoopScheduler.add(pl1_loopLoopEndIteration(pl1_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function pl1_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(pl1_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function pl1_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var pl2_loop;
function pl2_loopLoopBegin(pl2_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    pl2_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.FULLRANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'pl2.xlsx',
      seed: undefined, name: 'pl2_loop'
    });
    psychoJS.experiment.addLoop(pl2_loop); // add the loop to the experiment
    currentLoop = pl2_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    pl2_loop.forEach(function() {
      snapshot = pl2_loop.getSnapshot();
    
      pl2_loopLoopScheduler.add(importConditions(snapshot));
      pl2_loopLoopScheduler.add(pl2_setupRoutineBegin(snapshot));
      pl2_loopLoopScheduler.add(pl2_setupRoutineEachFrame());
      pl2_loopLoopScheduler.add(pl2_setupRoutineEnd(snapshot));
      pl2_loopLoopScheduler.add(pl2_taskRoutineBegin(snapshot));
      pl2_loopLoopScheduler.add(pl2_taskRoutineEachFrame());
      pl2_loopLoopScheduler.add(pl2_taskRoutineEnd(snapshot));
      pl2_loopLoopScheduler.add(pl2_dataRoutineBegin(snapshot));
      pl2_loopLoopScheduler.add(pl2_dataRoutineEachFrame());
      pl2_loopLoopScheduler.add(pl2_dataRoutineEnd(snapshot));
      pl2_loopLoopScheduler.add(pl2_loopLoopEndIteration(pl2_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function pl2_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(pl2_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function pl2_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function show_trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(show_trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function show_trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var show_no_consent;
function show_no_consentLoopBegin(show_no_consentLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    show_no_consent = new TrialHandler({
      psychoJS: psychoJS,
      nReps: flag_no_consent, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'show_no_consent'
    });
    psychoJS.experiment.addLoop(show_no_consent); // add the loop to the experiment
    currentLoop = show_no_consent;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    show_no_consent.forEach(function() {
      snapshot = show_no_consent.getSnapshot();
    
      show_no_consentLoopScheduler.add(importConditions(snapshot));
      show_no_consentLoopScheduler.add(no_consent_screenRoutineBegin(snapshot));
      show_no_consentLoopScheduler.add(no_consent_screenRoutineEachFrame());
      show_no_consentLoopScheduler.add(no_consent_screenRoutineEnd(snapshot));
      show_no_consentLoopScheduler.add(show_no_consentLoopEndIteration(show_no_consentLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function show_no_consentLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(show_no_consent);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function show_no_consentLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var _global_instructions1_key_allKeys;
var global_instructions_1Components;
function global_instructions_1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'global_instructions_1' ---
    t = 0;
    global_instructions_1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    global_instructions1_key.keys = undefined;
    global_instructions1_key.rt = undefined;
    _global_instructions1_key_allKeys = [];
    // keep track of which components have finished
    global_instructions_1Components = [];
    global_instructions_1Components.push(global_instructions1_img);
    global_instructions_1Components.push(global_instructions1_key);
    
    global_instructions_1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function global_instructions_1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'global_instructions_1' ---
    // get current time
    t = global_instructions_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *global_instructions1_img* updates
    if (t >= 0.0 && global_instructions1_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      global_instructions1_img.tStart = t;  // (not accounting for frame time here)
      global_instructions1_img.frameNStart = frameN;  // exact frame index
      
      global_instructions1_img.setAutoDraw(true);
    }
    
    
    // *global_instructions1_key* updates
    if (t >= 0.0 && global_instructions1_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      global_instructions1_key.tStart = t;  // (not accounting for frame time here)
      global_instructions1_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      global_instructions1_key.clock.reset();
      global_instructions1_key.start();
      global_instructions1_key.clearEvents();
    }
    
    if (global_instructions1_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = global_instructions1_key.getKeys({keyList: ['space'], waitRelease: false});
      _global_instructions1_key_allKeys = _global_instructions1_key_allKeys.concat(theseKeys);
      if (_global_instructions1_key_allKeys.length > 0) {
        global_instructions1_key.keys = _global_instructions1_key_allKeys[_global_instructions1_key_allKeys.length - 1].name;  // just the last key pressed
        global_instructions1_key.rt = _global_instructions1_key_allKeys[_global_instructions1_key_allKeys.length - 1].rt;
        global_instructions1_key.duration = _global_instructions1_key_allKeys[_global_instructions1_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    global_instructions_1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function global_instructions_1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'global_instructions_1' ---
    global_instructions_1Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(global_instructions1_key.corr, level);
    }
    psychoJS.experiment.addData('global_instructions1_key.keys', global_instructions1_key.keys);
    if (typeof global_instructions1_key.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('global_instructions1_key.rt', global_instructions1_key.rt);
        psychoJS.experiment.addData('global_instructions1_key.duration', global_instructions1_key.duration);
        routineTimer.reset();
        }
    
    global_instructions1_key.stop();
    // the Routine "global_instructions_1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _global_instructions2_key_allKeys;
var global_instructions_2Components;
function global_instructions_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'global_instructions_2' ---
    t = 0;
    global_instructions_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    global_instructions2_key.keys = undefined;
    global_instructions2_key.rt = undefined;
    _global_instructions2_key_allKeys = [];
    // keep track of which components have finished
    global_instructions_2Components = [];
    global_instructions_2Components.push(global_instructions2_img);
    global_instructions_2Components.push(global_instructions2_key);
    
    global_instructions_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function global_instructions_2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'global_instructions_2' ---
    // get current time
    t = global_instructions_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *global_instructions2_img* updates
    if (t >= 0.0 && global_instructions2_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      global_instructions2_img.tStart = t;  // (not accounting for frame time here)
      global_instructions2_img.frameNStart = frameN;  // exact frame index
      
      global_instructions2_img.setAutoDraw(true);
    }
    
    
    // *global_instructions2_key* updates
    if (t >= 0.0 && global_instructions2_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      global_instructions2_key.tStart = t;  // (not accounting for frame time here)
      global_instructions2_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      global_instructions2_key.clock.reset();
      global_instructions2_key.start();
      global_instructions2_key.clearEvents();
    }
    
    if (global_instructions2_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = global_instructions2_key.getKeys({keyList: ['space'], waitRelease: false});
      _global_instructions2_key_allKeys = _global_instructions2_key_allKeys.concat(theseKeys);
      if (_global_instructions2_key_allKeys.length > 0) {
        global_instructions2_key.keys = _global_instructions2_key_allKeys[_global_instructions2_key_allKeys.length - 1].name;  // just the last key pressed
        global_instructions2_key.rt = _global_instructions2_key_allKeys[_global_instructions2_key_allKeys.length - 1].rt;
        global_instructions2_key.duration = _global_instructions2_key_allKeys[_global_instructions2_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    global_instructions_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function global_instructions_2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'global_instructions_2' ---
    global_instructions_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(global_instructions2_key.corr, level);
    }
    psychoJS.experiment.addData('global_instructions2_key.keys', global_instructions2_key.keys);
    if (typeof global_instructions2_key.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('global_instructions2_key.rt', global_instructions2_key.rt);
        psychoJS.experiment.addData('global_instructions2_key.duration', global_instructions2_key.duration);
        routineTimer.reset();
        }
    
    global_instructions2_key.stop();
    // the Routine "global_instructions_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _global_instructions3_key_allKeys;
var global_instructions_3Components;
function global_instructions_3RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'global_instructions_3' ---
    t = 0;
    global_instructions_3Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    global_instructions3_key.keys = undefined;
    global_instructions3_key.rt = undefined;
    _global_instructions3_key_allKeys = [];
    // keep track of which components have finished
    global_instructions_3Components = [];
    global_instructions_3Components.push(global_instructions3_img);
    global_instructions_3Components.push(global_instructions3_key);
    
    global_instructions_3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function global_instructions_3RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'global_instructions_3' ---
    // get current time
    t = global_instructions_3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *global_instructions3_img* updates
    if (t >= 0.0 && global_instructions3_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      global_instructions3_img.tStart = t;  // (not accounting for frame time here)
      global_instructions3_img.frameNStart = frameN;  // exact frame index
      
      global_instructions3_img.setAutoDraw(true);
    }
    
    
    // *global_instructions3_key* updates
    if (t >= 0.0 && global_instructions3_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      global_instructions3_key.tStart = t;  // (not accounting for frame time here)
      global_instructions3_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      global_instructions3_key.clock.reset();
      global_instructions3_key.start();
      global_instructions3_key.clearEvents();
    }
    
    if (global_instructions3_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = global_instructions3_key.getKeys({keyList: ['space'], waitRelease: false});
      _global_instructions3_key_allKeys = _global_instructions3_key_allKeys.concat(theseKeys);
      if (_global_instructions3_key_allKeys.length > 0) {
        global_instructions3_key.keys = _global_instructions3_key_allKeys[_global_instructions3_key_allKeys.length - 1].name;  // just the last key pressed
        global_instructions3_key.rt = _global_instructions3_key_allKeys[_global_instructions3_key_allKeys.length - 1].rt;
        global_instructions3_key.duration = _global_instructions3_key_allKeys[_global_instructions3_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    global_instructions_3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function global_instructions_3RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'global_instructions_3' ---
    global_instructions_3Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(global_instructions3_key.corr, level);
    }
    psychoJS.experiment.addData('global_instructions3_key.keys', global_instructions3_key.keys);
    if (typeof global_instructions3_key.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('global_instructions3_key.rt', global_instructions3_key.rt);
        psychoJS.experiment.addData('global_instructions3_key.duration', global_instructions3_key.duration);
        routineTimer.reset();
        }
    
    global_instructions3_key.stop();
    // the Routine "global_instructions_3" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _global_instructions4_key_allKeys;
var global_instructions_4Components;
function global_instructions_4RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'global_instructions_4' ---
    t = 0;
    global_instructions_4Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    global_instructions4_key.keys = undefined;
    global_instructions4_key.rt = undefined;
    _global_instructions4_key_allKeys = [];
    // keep track of which components have finished
    global_instructions_4Components = [];
    global_instructions_4Components.push(global_instructions4_img);
    global_instructions_4Components.push(global_instructions4_key);
    
    global_instructions_4Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function global_instructions_4RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'global_instructions_4' ---
    // get current time
    t = global_instructions_4Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *global_instructions4_img* updates
    if (t >= 0.0 && global_instructions4_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      global_instructions4_img.tStart = t;  // (not accounting for frame time here)
      global_instructions4_img.frameNStart = frameN;  // exact frame index
      
      global_instructions4_img.setAutoDraw(true);
    }
    
    
    // *global_instructions4_key* updates
    if (t >= 0.0 && global_instructions4_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      global_instructions4_key.tStart = t;  // (not accounting for frame time here)
      global_instructions4_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      global_instructions4_key.clock.reset();
      global_instructions4_key.start();
      global_instructions4_key.clearEvents();
    }
    
    if (global_instructions4_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = global_instructions4_key.getKeys({keyList: ['space'], waitRelease: false});
      _global_instructions4_key_allKeys = _global_instructions4_key_allKeys.concat(theseKeys);
      if (_global_instructions4_key_allKeys.length > 0) {
        global_instructions4_key.keys = _global_instructions4_key_allKeys[_global_instructions4_key_allKeys.length - 1].name;  // just the last key pressed
        global_instructions4_key.rt = _global_instructions4_key_allKeys[_global_instructions4_key_allKeys.length - 1].rt;
        global_instructions4_key.duration = _global_instructions4_key_allKeys[_global_instructions4_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    global_instructions_4Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function global_instructions_4RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'global_instructions_4' ---
    global_instructions_4Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(global_instructions4_key.corr, level);
    }
    psychoJS.experiment.addData('global_instructions4_key.keys', global_instructions4_key.keys);
    if (typeof global_instructions4_key.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('global_instructions4_key.rt', global_instructions4_key.rt);
        psychoJS.experiment.addData('global_instructions4_key.duration', global_instructions4_key.duration);
        routineTimer.reset();
        }
    
    global_instructions4_key.stop();
    // the Routine "global_instructions_4" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _stake_instructions_key_allKeys;
var stake_instructionsComponents;
function stake_instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'stake_instructions' ---
    t = 0;
    stake_instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    stake_instructions_key.keys = undefined;
    stake_instructions_key.rt = undefined;
    _stake_instructions_key_allKeys = [];
    // keep track of which components have finished
    stake_instructionsComponents = [];
    stake_instructionsComponents.push(stake_instructions_img);
    stake_instructionsComponents.push(stake_instructions_key);
    
    stake_instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function stake_instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'stake_instructions' ---
    // get current time
    t = stake_instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *stake_instructions_img* updates
    if (t >= 0.0 && stake_instructions_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stake_instructions_img.tStart = t;  // (not accounting for frame time here)
      stake_instructions_img.frameNStart = frameN;  // exact frame index
      
      stake_instructions_img.setAutoDraw(true);
    }
    
    
    // *stake_instructions_key* updates
    if (t >= 0.0 && stake_instructions_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stake_instructions_key.tStart = t;  // (not accounting for frame time here)
      stake_instructions_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      stake_instructions_key.clock.reset();
      stake_instructions_key.start();
      stake_instructions_key.clearEvents();
    }
    
    if (stake_instructions_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = stake_instructions_key.getKeys({keyList: ['space'], waitRelease: false});
      _stake_instructions_key_allKeys = _stake_instructions_key_allKeys.concat(theseKeys);
      if (_stake_instructions_key_allKeys.length > 0) {
        stake_instructions_key.keys = _stake_instructions_key_allKeys[_stake_instructions_key_allKeys.length - 1].name;  // just the last key pressed
        stake_instructions_key.rt = _stake_instructions_key_allKeys[_stake_instructions_key_allKeys.length - 1].rt;
        stake_instructions_key.duration = _stake_instructions_key_allKeys[_stake_instructions_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    stake_instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function stake_instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'stake_instructions' ---
    stake_instructionsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(stake_instructions_key.corr, level);
    }
    psychoJS.experiment.addData('stake_instructions_key.keys', stake_instructions_key.keys);
    if (typeof stake_instructions_key.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('stake_instructions_key.rt', stake_instructions_key.rt);
        psychoJS.experiment.addData('stake_instructions_key.duration', stake_instructions_key.duration);
        routineTimer.reset();
        }
    
    stake_instructions_key.stop();
    // the Routine "stake_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _global_instructions5_key_allKeys;
var global_instructions5Components;
function global_instructions5RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'global_instructions5' ---
    t = 0;
    global_instructions5Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    global_instructions5_key.keys = undefined;
    global_instructions5_key.rt = undefined;
    _global_instructions5_key_allKeys = [];
    // keep track of which components have finished
    global_instructions5Components = [];
    global_instructions5Components.push(global_instructions5_img);
    global_instructions5Components.push(global_instructions5_key);
    
    global_instructions5Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function global_instructions5RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'global_instructions5' ---
    // get current time
    t = global_instructions5Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *global_instructions5_img* updates
    if (t >= 0.0 && global_instructions5_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      global_instructions5_img.tStart = t;  // (not accounting for frame time here)
      global_instructions5_img.frameNStart = frameN;  // exact frame index
      
      global_instructions5_img.setAutoDraw(true);
    }
    
    
    // *global_instructions5_key* updates
    if (t >= 0.0 && global_instructions5_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      global_instructions5_key.tStart = t;  // (not accounting for frame time here)
      global_instructions5_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      global_instructions5_key.clock.reset();
      global_instructions5_key.start();
      global_instructions5_key.clearEvents();
    }
    
    if (global_instructions5_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = global_instructions5_key.getKeys({keyList: ['space'], waitRelease: false});
      _global_instructions5_key_allKeys = _global_instructions5_key_allKeys.concat(theseKeys);
      if (_global_instructions5_key_allKeys.length > 0) {
        global_instructions5_key.keys = _global_instructions5_key_allKeys[_global_instructions5_key_allKeys.length - 1].name;  // just the last key pressed
        global_instructions5_key.rt = _global_instructions5_key_allKeys[_global_instructions5_key_allKeys.length - 1].rt;
        global_instructions5_key.duration = _global_instructions5_key_allKeys[_global_instructions5_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    global_instructions5Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function global_instructions5RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'global_instructions5' ---
    global_instructions5Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(global_instructions5_key.corr, level);
    }
    psychoJS.experiment.addData('global_instructions5_key.keys', global_instructions5_key.keys);
    if (typeof global_instructions5_key.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('global_instructions5_key.rt', global_instructions5_key.rt);
        psychoJS.experiment.addData('global_instructions5_key.duration', global_instructions5_key.duration);
        routineTimer.reset();
        }
    
    global_instructions5_key.stop();
    // the Routine "global_instructions5" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var t_countdownComponents;
function t_countdownRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_countdown' ---
    t = 0;
    t_countdownClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.500000);
    // update component parameters for each repeat
    // keep track of which components have finished
    t_countdownComponents = [];
    t_countdownComponents.push(t_countdown_3_txt);
    t_countdownComponents.push(t_countdown_2_txt);
    t_countdownComponents.push(t_countdown_1_txt);
    
    t_countdownComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function t_countdownRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_countdown' ---
    // get current time
    t = t_countdownClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *t_countdown_3_txt* updates
    if (t >= 0.0 && t_countdown_3_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_countdown_3_txt.tStart = t;  // (not accounting for frame time here)
      t_countdown_3_txt.frameNStart = frameN;  // exact frame index
      
      t_countdown_3_txt.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (t_countdown_3_txt.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      t_countdown_3_txt.setAutoDraw(false);
    }
    
    // *t_countdown_2_txt* updates
    if (t >= 0.5 && t_countdown_2_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_countdown_2_txt.tStart = t;  // (not accounting for frame time here)
      t_countdown_2_txt.frameNStart = frameN;  // exact frame index
      
      t_countdown_2_txt.setAutoDraw(true);
    }
    
    frameRemains = 0.5 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (t_countdown_2_txt.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      t_countdown_2_txt.setAutoDraw(false);
    }
    
    // *t_countdown_1_txt* updates
    if (t >= 1 && t_countdown_1_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_countdown_1_txt.tStart = t;  // (not accounting for frame time here)
      t_countdown_1_txt.frameNStart = frameN;  // exact frame index
      
      t_countdown_1_txt.setAutoDraw(true);
    }
    
    frameRemains = 1 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (t_countdown_1_txt.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      t_countdown_1_txt.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_countdownComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_countdownRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_countdown' ---
    t_countdownComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var p_step2_flag;
var p_reward_flag;
var p_failStep1_flag;
var p_failStep2_flag;
var p_step1_pair;
var stim;
var r_points;
var p_mult_img;
var p_step1_stimRight_var;
var p_step1_stimLeft_var;
var p_step1_deact_img;
var p_step1_stimRightDeact_file;
var p_step1_stimLeftDeact_file;
var p_stake_img;
var p_step1_bg_img;
var p_step1_leftStim_img;
var p_step1_rightStim_img;
var p_step1_highlight_img;
var p_step1_scoreBg_img;
var p_step1_score_txt;
var p_setupComponents;
function p_setupRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'p_setup' ---
    t = 0;
    p_setupClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from p_setup_code
    p_step2_flag = 0;
    p_reward_flag = 0;
    p_failStep1_flag = 0;
    p_failStep2_flag = 0;
    p_points = 0;
    p_step1_pair = [];
    stim = 0;
    r_points = 0;
    
    p_mult_img = (("ressources/t_mult" + p_mult.toString() + "_img.png"));
    
    for (var i=0; i < l_p_step1_stims.length; i++){
        stim = l_p_step1_stims[i];
        if (stim["pair"] === pair_index) {
            p_step1_pair.push(stim);
        };
    };
    shuffleArray(p_step1_pair);
    p_step1_stimRight_var = p_step1_pair[0];
    p_step1_stimLeft_var = p_step1_pair[1];
    
    p_step1_deact_img = "ressources/mush0.jpg";
    
    p_step1_stimRight_file = p_step1_stimRight_var["file"];
    p_step1_stimLeft_file = p_step1_stimLeft_var["file"];
    p_step1_stimRightDeact_file = p_step1_stimRight_var["deact_file"];
    p_step1_stimLeftDeact_file = p_step1_stimLeft_var["deact_file"];
    
    //IMG
    
    p_stake_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_stake_img', units : 'norm', 
        image : p_mult_img, mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [0.32, 0.55],
        color : new util.Color([0, 0, 0]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -5.0 
    });
    
    p_step1_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step1_bg_img', units : 'norm', 
        image : 'ressources/step1_background.png', mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
    });
     
    p_step1_leftStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step1_leftStim_img', units : undefined, 
        image : p_step1_stimLeft_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimLeft_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    p_step1_rightStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step1_rightStim_img', units : undefined, 
        image : p_step1_stimRight_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimRight_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -4.0 
    });
    
    p_step1_highlight_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step1_highlight_img', units : 'height', 
        image : 'ressources/highlight.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : undefined, size : global_highlight_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -5.0 
    });
    
    p_step1_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step1_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -6.0 
    });
    
    p_step1_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'p_step1_score_txt',
        text: "SCORE: " + p_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -7.0 
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // Run 'Begin Routine' code from p_setup_image_code
    p_step1_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step1_bg_img', units : 'norm', 
        image : 'ressources/step1_background.png', mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
    });
    
     
    p_step1_leftStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step1_leftStim_img', units : undefined, 
        image : p_step1_stimLeft_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimLeft_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    p_step1_rightStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step1_rightStim_img', units : undefined, 
        image : p_step1_stimRight_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimRight_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -4.0 
    });
    
    p_step1_highlight_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step1_highlight_img', units : 'height', 
        image : 'ressources/highlight.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : undefined, size : global_highlight_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -5.0 
    });
    
    p_step1_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step1_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -6.0 
    });
    
    p_step1_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'p_step1_score_txt',
        text: "SCORE: " + p_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -7.0 
    });
    
    // keep track of which components have finished
    p_setupComponents = [];
    
    p_setupComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function p_setupRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'p_setup' ---
    // get current time
    t = p_setupClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    p_setupComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function p_setupRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'p_setup' ---
    p_setupComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "p_setup" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var p_fixation_2Components;
function p_fixation_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'p_fixation_2' ---
    t = 0;
    p_fixation_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('p_fixation_2.started', globalClock.getTime());
    p_step1_bg_img.setAutoDraw(true);
    p_step1_scoreBg_img.setAutoDraw(true);
    p_step1_score_txt.setAutoDraw(true);
    // keep track of which components have finished
    p_fixation_2Components = [];
    p_fixation_2Components.push(p_fixation_mandatory2_txt);
    
    p_fixation_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function p_fixation_2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'p_fixation_2' ---
    // get current time
    t = p_fixation_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 0.5) {
        continueRoutine = false
    }
    
    // *p_fixation_mandatory2_txt* updates
    if (t >= 0.0 && p_fixation_mandatory2_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      p_fixation_mandatory2_txt.tStart = t;  // (not accounting for frame time here)
      p_fixation_mandatory2_txt.frameNStart = frameN;  // exact frame index
      
      p_fixation_mandatory2_txt.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    p_fixation_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function p_fixation_2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'p_fixation_2' ---
    p_fixation_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('p_fixation_2.stopped', globalClock.getTime());
    p_step1_bg_img.setAutoDraw(false);
    p_step1_scoreBg_img.setAutoDraw(false);
    p_step1_score_txt.setAutoDraw(false);
    // the Routine "p_fixation_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var p_stakeComponents;
function p_stakeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'p_stake' ---
    t = 0;
    p_stakeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    p_stake_img.setAutoDraw(true);
    p_step1_bg_img.setAutoDraw(true);
    p_step1_scoreBg_img.setAutoDraw(true);
    p_step1_score_txt.setAutoDraw(true);
    // keep track of which components have finished
    p_stakeComponents = [];
    p_stakeComponents.push(p_stake_mandatory_txt);
    
    p_stakeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function p_stakeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'p_stake' ---
    // get current time
    t = p_stakeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1) {
        continueRoutine = false
    }
    
    // *p_stake_mandatory_txt* updates
    if (t >= 0.0 && p_stake_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      p_stake_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      p_stake_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      p_stake_mandatory_txt.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    p_stakeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function p_stakeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'p_stake' ---
    p_stakeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    p_stake_img.setAutoDraw(false);
    p_step1_bg_img.setAutoDraw(false);
    p_step1_scoreBg_img.setAutoDraw(false);
    p_step1_score_txt.setAutoDraw(false);
    // the Routine "p_stake" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _p_step1_keyresp_allKeys;
var p_step1Components;
function p_step1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'p_step1' ---
    t = 0;
    p_step1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.500000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from p_step1_image_code
    p_step1_bg_img.setAutoDraw(true);
    p_step1_leftStim_img.setAutoDraw(true);
    p_step1_rightStim_img.setAutoDraw(true);
    p_step1_scoreBg_img.setAutoDraw(true);
    p_step1_score_txt.setAutoDraw(true);
    
    p_step1_keyresp.keys = undefined;
    p_step1_keyresp.rt = undefined;
    _p_step1_keyresp_allKeys = [];
    // keep track of which components have finished
    p_step1Components = [];
    p_step1Components.push(p_step1_keyresp);
    
    p_step1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function p_step1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'p_step1' ---
    // get current time
    t = p_step1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1.5) {
        continueRoutine = false
    }
    if (_p_step1_keyresp_allKeys.length > 0) {
        if ((p_step1_keyresp.keys === "s")) {
            p_step1_highlight_img.setPos([(-0.5), 0.19]);
            p_step1_rightStim_img.setImage(p_step1_stimRightDeact_file);
            p_step1_highlight_img.setAutoDraw(true);
            p_step1_rightStim_img.setAutoDraw(true);
        } else {
            p_step1_highlight_img.setPos([0.5, 0.19]);
            p_step1_leftStim_img.setImage(p_step1_stimLeftDeact_file);
            p_step1_highlight_img.setAutoDraw(true);
            p_step1_leftStim_img.setAutoDraw(true);
        }
    }
    
    
    // *p_step1_keyresp* updates
    if (t >= 0 && p_step1_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      p_step1_keyresp.tStart = t;  // (not accounting for frame time here)
      p_step1_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      p_step1_keyresp.clock.reset();
      p_step1_keyresp.start();
      p_step1_keyresp.clearEvents();
    }
    
    frameRemains = 0 + 1.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (p_step1_keyresp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      p_step1_keyresp.status = PsychoJS.Status.FINISHED;
        }
      
    if (p_step1_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = p_step1_keyresp.getKeys({keyList: ['s', 'k'], waitRelease: false});
      _p_step1_keyresp_allKeys = _p_step1_keyresp_allKeys.concat(theseKeys);
      if (_p_step1_keyresp_allKeys.length > 0) {
        p_step1_keyresp.keys = _p_step1_keyresp_allKeys[0].name;  // just the first key pressed
        p_step1_keyresp.rt = _p_step1_keyresp_allKeys[0].rt;
        p_step1_keyresp.duration = _p_step1_keyresp_allKeys[0].duration;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    p_step1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var p_step2_stimBg_deact_file;
var p_reward_trialPoints_txt;
var p_step2_bg_img;
var p_step2_stim_img;
var p_step2_highlight_img;
var p_step2_scoreBg_img;
var p_step2_score_txt;
var p_failStep1_bg_img;
var p_failStep1_leftStim_img;
var p_failStep1_rightStim_img;
var p_failStep1_scoreBg_img;
var p_failStep1_score_txt;
var p_failStep1_tooSlow_img;
var p_failStep2_bg_img;
var p_failStep2_stim_img;
var p_failStep2_scoreBg_img;
var p_failStep2_score_txt;
var p_failStep2_tooSlow_img;
function p_step1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'p_step1' ---
    p_step1Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Run 'End Routine' code from p_step1_code
    if (_p_step1_keyresp_allKeys.length > 0) {
        p_step2_flag = 1;
        if ((p_step1_keyresp.keys === "s")) {
            p_step1_choice = p_step1_stimLeft_var;
        } else {
            p_step1_choice = p_step1_stimRight_var;
        }
        p_step2_stim_var = p_step1_choice["step2"];
        p_step2_stimBg_deact_file = p_step2_stim_var["deact_file"];
        p_step2_stimBg_file = p_step2_stim_var["file"];
        p_step2_stimBasket_file = p_step2_stim_var["basket_file"];
        p_points = p_step1_choice["reward"][p_index];
        p_points = p_step1_choice["reward"][p_index] * p_mult;
        if ((p_points === 0)) {
            p_reward_trialPoints_txt = "0";
        } else {
            p_reward_trialPoints_txt = ("+" + p_points.toString());
        }
    } else {
        p_failStep1_flag = 1;
    }
    // Run 'End Routine' code from p_step1_image_code
    p_step1_bg_img.setAutoDraw(false);
    p_step1_leftStim_img.setAutoDraw(false);
    p_step1_rightStim_img.setAutoDraw(false);
    p_step1_highlight_img.setAutoDraw(false);
    p_step1_score_txt.setAutoDraw(false);
    p_step1_scoreBg_img.setAutoDraw(false);
    
    //STEP2
    
    p_step2_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step2_bg_img', units : 'norm', 
        image : p_step2_stimBg_file, mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
      });
    
    p_step2_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
      
    p_step2_stim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step2_stim_img', units : 'height', 
        image : p_step2_stimBasket_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_pos, size : global_step2_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    p_step2_highlight_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step2_highlight_img', units : undefined, 
        image : 'ressources/highlight.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_highlight_pos, size : [0.6, 0.6],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -4.0 
    });
    
    p_step2_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_step2_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -5.0 
    });
    
    p_step2_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'p_step2_score_txt',
        text: 'SCORE: ' + p_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -6.0 
    });
    
    //FAILSTEP1
    
    p_failStep1_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_failStep1_bg_img', units : 'norm', 
        image : 'ressources/step1_background_deact.png', mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
    });
    
    p_failStep1_leftStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_failStep1_leftStim_img', units : undefined, 
        image : p_step1_stimLeftDeact_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimLeft_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -1.0 
    });
    
    p_failStep1_rightStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_failStep1_rightStim_img', units : undefined, 
        image : p_step1_stimRightDeact_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimRight_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -2.0 
    });
    
    p_failStep1_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_failStep1_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    p_failStep1_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'p_fail_score_txt',
        text: 'SCORE: ' + p_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -4.0 
    });
    
    p_failStep1_tooSlow_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_failStep1_tooSlow_img', units : undefined, 
        image : 'ressources/p_step1_tooSlow.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : p_tooSlow_pos, size : p_tooSlow_size,
        color : new util.Color([0, 0, 0]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    //FAILSTEP2
    
    p_failStep2_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_failStep2_bg_img', units : 'norm', 
        image : p_step2_stimBg_deact_file, mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
      });
    
    p_failStep2_stim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_failStep2_stim_img', units : 'height', 
        image : 'ressources/fail_basket.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_pos, size : global_step2_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -1.0 
    });
    
    p_failStep2_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_failStep2_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -2.0 
    });
    
    p_failStep2_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'p_failStep2_score_txt',
        text: 'SCORE: ' + p_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -3.0 
     });
     
     p_failStep2_tooSlow_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_failStep1_tooSlow_img', units : undefined, 
        image : 'ressources/p_step2_tooSlow.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : p_tooSlow_pos, size : p_tooSlow_size,
        color : new util.Color([0, 0, 0]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(p_step1_keyresp.corr, level);
    }
    psychoJS.experiment.addData('p_step1_keyresp.keys', p_step1_keyresp.keys);
    if (typeof p_step1_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('p_step1_keyresp.rt', p_step1_keyresp.rt);
        psychoJS.experiment.addData('p_step1_keyresp.duration', p_step1_keyresp.duration);
        }
    
    p_step1_keyresp.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var ITSComponents;
function ITSRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'ITS' ---
    t = 0;
    ITSClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    ITSComponents = [];
    ITSComponents.push(ITS_mandatory_txt);
    
    ITSComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function ITSRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'ITS' ---
    // get current time
    t = ITSClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 0.5) {
        continueRoutine = false
    }
    
    // *ITS_mandatory_txt* updates
    if (t >= 0.0 && ITS_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ITS_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      ITS_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      ITS_mandatory_txt.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    ITSComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ITSRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'ITS' ---
    ITSComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "ITS" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _p_step2_keyresp_allKeys;
var p_step2Components;
function p_step2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'p_step2' ---
    t = 0;
    p_step2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.500000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from p_step2_image_code
    p_step2_bg_img.setAutoDraw(true);
    p_step2_stim_img.setAutoDraw(true);
    p_step2_scoreBg_img.setAutoDraw(true);
    p_step2_score_txt.setAutoDraw(true);
    p_step2_keyresp.keys = undefined;
    p_step2_keyresp.rt = undefined;
    _p_step2_keyresp_allKeys = [];
    // keep track of which components have finished
    p_step2Components = [];
    p_step2Components.push(p_step2_keyresp);
    
    p_step2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function p_step2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'p_step2' ---
    // get current time
    t = p_step2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1.5) {
        continueRoutine = false
    }
    // Run 'Each Frame' code from p_step2_code
    if (_p_step2_keyresp_allKeys.length > 0) {
        p_step2_highlight_img.setAutoDraw(true);
    }
    
    
    // *p_step2_keyresp* updates
    if (t >= 0.0 && p_step2_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      p_step2_keyresp.tStart = t;  // (not accounting for frame time here)
      p_step2_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      p_step2_keyresp.clock.reset();
      p_step2_keyresp.start();
      p_step2_keyresp.clearEvents();
    }
    
    frameRemains = 0.0 + 1.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (p_step2_keyresp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      p_step2_keyresp.status = PsychoJS.Status.FINISHED;
        }
      
    if (p_step2_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = p_step2_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _p_step2_keyresp_allKeys = _p_step2_keyresp_allKeys.concat(theseKeys);
      if (_p_step2_keyresp_allKeys.length > 0) {
        p_step2_keyresp.keys = _p_step2_keyresp_allKeys[0].name;  // just the first key pressed
        p_step2_keyresp.rt = _p_step2_keyresp_allKeys[0].rt;
        p_step2_keyresp.duration = _p_step2_keyresp_allKeys[0].duration;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    p_step2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var p_reward_bg_img;
var p_reward_step2Stim_img;
var p_reward_step2Highlight_img;
var p_reward_scoreBg_img;
var p_reward_rewardAmount_txt;
var p_reward_rewardAmountBg_img;
var p_reward_score_txt;
var p_reward_mushroom_img;
function p_step2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'p_step2' ---
    p_step2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Run 'End Routine' code from p_step2_code
    if ((p_step2_keyresp.keys === "space")) {
        p_reward_flag = 1;
        p_score = (p_score + p_points);
    } else {
        p_failStep2_flag = 1;
        p_points = 0;
    }
            
    // Run 'End Routine' code from p_step2_image_code
    p_step2_stim_img.setAutoDraw(false);
    p_step2_highlight_img.setAutoDraw(false);
    p_step2_bg_img.setAutoDraw(false);
    p_step2_scoreBg_img.setAutoDraw(false);
    p_step2_score_txt.setAutoDraw(false);
    
    r_points = p_points / p_mult;
    
    //REWARD
    
    p_reward_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_reward_bg_img', units : 'norm', 
        image : p_step2_stimBg_file, mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
    });
    
    p_reward_step2Stim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_reward_step2Stim_img', units : 'height', 
        image : p_step2_stimBasket_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_pos, size : global_step2_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -1.0 
    });
    
    p_reward_step2Highlight_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_reward_step2Highlight_img', units : undefined, 
        image : 'ressources/highlight.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_highlight_pos, size : [0.6, 0.6],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -2.0 
    });
    
    p_reward_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_reward_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    p_reward_rewardAmount_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'p_reward_rewardAmount_txt',
        text: p_reward_trialPoints_txt,
        font: 'Open Sans',
        units: undefined, 
        pos: [0, 0.35], height: 0.25,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -4.0 
    });
    
    p_reward_rewardAmountBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_reward_rewardAmountBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : global_rewardBg_pos, size : global_rewardBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.6,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    p_reward_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'p_reward_score_txt',
        text: "SCORE: " + p_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -6.0 
    });
    
    p_reward_mushroom_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'p_reward_mushroom_img', units : undefined, 
        image : (("ressources/mush" + r_points.toString()) + ".png"),
        mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : [0, 0.2], size : [0.5, 0.5],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -7.0 
    });
    
    
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(p_step2_keyresp.corr, level);
    }
    psychoJS.experiment.addData('p_step2_keyresp.keys', p_step2_keyresp.keys);
    if (typeof p_step2_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('p_step2_keyresp.rt', p_step2_keyresp.rt);
        psychoJS.experiment.addData('p_step2_keyresp.duration', p_step2_keyresp.duration);
        }
    
    p_step2_keyresp.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var p_reward_mushroom_var;
var p_rewardComponents;
function p_rewardRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'p_reward' ---
    t = 0;
    p_rewardClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    
    p_reward_mushroom_var = (("ressources/mush" + r_points.toString()) + ".png");
    
    p_reward_bg_img.setAutoDraw(true);
    p_reward_step2Stim_img.setAutoDraw(true);
    p_reward_step2Highlight_img.setAutoDraw(true);
    p_reward_scoreBg_img.setAutoDraw(true);
    p_reward_rewardAmountBg_img.setAutoDraw(true);
    p_reward_rewardAmount_txt.setAutoDraw(true);
    p_reward_score_txt.setAutoDraw(true);
    p_reward_mushroom_img.setAutoDraw(true);
    // keep track of which components have finished
    p_rewardComponents = [];
    p_rewardComponents.push(p_reward_mandatory_txt);
    
    p_rewardComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function p_rewardRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'p_reward' ---
    // get current time
    t = p_rewardClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 2) {
        continueRoutine = false
    }
    
    // *p_reward_mandatory_txt* updates
    if (t >= 0.0 && p_reward_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      p_reward_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      p_reward_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      p_reward_mandatory_txt.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    p_rewardComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function p_rewardRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'p_reward' ---
    p_rewardComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    p_reward_bg_img.setAutoDraw(false);
    p_reward_step2Stim_img.setAutoDraw(false);
    p_reward_step2Highlight_img.setAutoDraw(false);
    p_reward_scoreBg_img.setAutoDraw(false);
    p_reward_rewardAmount_txt.setAutoDraw(false);
    p_reward_score_txt.setAutoDraw(false);
    p_reward_rewardAmountBg_img.setAutoDraw(false);
    p_reward_mushroom_img.setAutoDraw(false);
    // the Routine "p_reward" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _p_failStep1_keyresp_allKeys;
var p_failStep1Components;
function p_failStep1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'p_failStep1' ---
    t = 0;
    p_failStep1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from p_failStep1_image_code
    p_failStep1_bg_img.setAutoDraw(true);
    p_failStep1_leftStim_img.setAutoDraw(true);
    p_failStep1_rightStim_img.setAutoDraw(true);
    p_failStep1_scoreBg_img.setAutoDraw(true);
    p_failStep1_score_txt.setAutoDraw(true);
    p_failStep1_tooSlow_img.setAutoDraw(true);
    
    p_failStep1_keyresp.keys = undefined;
    p_failStep1_keyresp.rt = undefined;
    _p_failStep1_keyresp_allKeys = [];
    // keep track of which components have finished
    p_failStep1Components = [];
    p_failStep1Components.push(p_failStep1_mandatory_txt);
    p_failStep1Components.push(p_failStep1_keyresp);
    
    p_failStep1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function p_failStep1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'p_failStep1' ---
    // get current time
    t = p_failStep1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *p_failStep1_mandatory_txt* updates
    if (t >= 0.0 && p_failStep1_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      p_failStep1_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      p_failStep1_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      p_failStep1_mandatory_txt.setAutoDraw(true);
    }
    
    
    // *p_failStep1_keyresp* updates
    if (t >= 0.0 && p_failStep1_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      p_failStep1_keyresp.tStart = t;  // (not accounting for frame time here)
      p_failStep1_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      p_failStep1_keyresp.clock.reset();
      p_failStep1_keyresp.start();
      p_failStep1_keyresp.clearEvents();
    }
    
    if (p_failStep1_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = p_failStep1_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _p_failStep1_keyresp_allKeys = _p_failStep1_keyresp_allKeys.concat(theseKeys);
      if (_p_failStep1_keyresp_allKeys.length > 0) {
        p_failStep1_keyresp.keys = _p_failStep1_keyresp_allKeys[_p_failStep1_keyresp_allKeys.length - 1].name;  // just the last key pressed
        p_failStep1_keyresp.rt = _p_failStep1_keyresp_allKeys[_p_failStep1_keyresp_allKeys.length - 1].rt;
        p_failStep1_keyresp.duration = _p_failStep1_keyresp_allKeys[_p_failStep1_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    p_failStep1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function p_failStep1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'p_failStep1' ---
    p_failStep1Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Run 'End Routine' code from p_failStep1_image_code
    p_failStep1_bg_img.setAutoDraw(false);
    p_failStep1_leftStim_img.setAutoDraw(false);
    p_failStep1_rightStim_img.setAutoDraw(false);
    p_failStep1_scoreBg_img.setAutoDraw(false);
    p_failStep1_score_txt.setAutoDraw(false);
    p_failStep1_tooSlow_img.setAutoDraw(false);
    
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(p_failStep1_keyresp.corr, level);
    }
    psychoJS.experiment.addData('p_failStep1_keyresp.keys', p_failStep1_keyresp.keys);
    if (typeof p_failStep1_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('p_failStep1_keyresp.rt', p_failStep1_keyresp.rt);
        psychoJS.experiment.addData('p_failStep1_keyresp.duration', p_failStep1_keyresp.duration);
        routineTimer.reset();
        }
    
    p_failStep1_keyresp.stop();
    // the Routine "p_failStep1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _p_failStep2_keyresp_allKeys;
var p_failStep2Components;
function p_failStep2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'p_failStep2' ---
    t = 0;
    p_failStep2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from p_failStep2_image_code
    p_failStep2_bg_img.setAutoDraw(true);
    p_failStep2_stim_img.setAutoDraw(true);
    p_failStep2_scoreBg_img.setAutoDraw(true);
    p_failStep2_score_txt.setAutoDraw(true);
    p_failStep2_tooSlow_img.setAutoDraw(true);
    p_failStep2_keyresp.keys = undefined;
    p_failStep2_keyresp.rt = undefined;
    _p_failStep2_keyresp_allKeys = [];
    // keep track of which components have finished
    p_failStep2Components = [];
    p_failStep2Components.push(p_failStep2_mandatory_txt);
    p_failStep2Components.push(p_failStep2_keyresp);
    
    p_failStep2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function p_failStep2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'p_failStep2' ---
    // get current time
    t = p_failStep2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *p_failStep2_mandatory_txt* updates
    if (t >= 0.0 && p_failStep2_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      p_failStep2_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      p_failStep2_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      p_failStep2_mandatory_txt.setAutoDraw(true);
    }
    
    
    // *p_failStep2_keyresp* updates
    if (t >= 0.0 && p_failStep2_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      p_failStep2_keyresp.tStart = t;  // (not accounting for frame time here)
      p_failStep2_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      p_failStep2_keyresp.clock.reset();
      p_failStep2_keyresp.start();
      p_failStep2_keyresp.clearEvents();
    }
    
    if (p_failStep2_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = p_failStep2_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _p_failStep2_keyresp_allKeys = _p_failStep2_keyresp_allKeys.concat(theseKeys);
      if (_p_failStep2_keyresp_allKeys.length > 0) {
        p_failStep2_keyresp.keys = _p_failStep2_keyresp_allKeys[_p_failStep2_keyresp_allKeys.length - 1].name;  // just the last key pressed
        p_failStep2_keyresp.rt = _p_failStep2_keyresp_allKeys[_p_failStep2_keyresp_allKeys.length - 1].rt;
        p_failStep2_keyresp.duration = _p_failStep2_keyresp_allKeys[_p_failStep2_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    p_failStep2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function p_failStep2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'p_failStep2' ---
    p_failStep2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Run 'End Routine' code from p_failStep2_image_code
    p_failStep2_bg_img.setAutoDraw(false);
    p_failStep2_stim_img.setAutoDraw(false);
    p_failStep2_scoreBg_img.setAutoDraw(false);
    p_failStep2_score_txt.setAutoDraw(false);
    p_failStep2_tooSlow_img.setAutoDraw(false);
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(p_failStep2_keyresp.corr, level);
    }
    psychoJS.experiment.addData('p_failStep2_keyresp.keys', p_failStep2_keyresp.keys);
    if (typeof p_failStep2_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('p_failStep2_keyresp.rt', p_failStep2_keyresp.rt);
        psychoJS.experiment.addData('p_failStep2_keyresp.duration', p_failStep2_keyresp.duration);
        routineTimer.reset();
        }
    
    p_failStep2_keyresp.stop();
    // the Routine "p_failStep2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var p_dataComponents;
function p_dataRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'p_data' ---
    t = 0;
    p_dataClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData("p_step1_pair_index", pair_index);
    psychoJS.experiment.addData("p_step1_stimLeft_name", p_step1_stimLeft_var["name"]);
    psychoJS.experiment.addData("p_step1_stimLeft_pair", p_step1_stimLeft_var["pair"]);
    psychoJS.experiment.addData("p_step1_stimLeft_reward", p_step1_stimLeft_var["step2"]["reward"][p_index]);
    psychoJS.experiment.addData("p_step1_stimLeft_step2Stim", p_step1_stimLeft_var["step2"]["name"]);
    psychoJS.experiment.addData("p_step1_stimLeft_step2Basket", p_step1_stimLeft_var["step2"]["basket_name"]);
    psychoJS.experiment.addData("p_step1_stimRight_name", p_step1_stimRight_var["name"]);
    psychoJS.experiment.addData("p_step1_stimRight_pair", p_step1_stimRight_var["pair"]);
    psychoJS.experiment.addData("p_step1_stimRight_reward", p_step1_stimRight_var["step2"]["reward"][p_index]);
    psychoJS.experiment.addData("p_step1_stimRight_step2Stim", p_step1_stimRight_var["step2"]["name"]);
    psychoJS.experiment.addData("p_step1_stimRight_step2Basket", p_step1_stimRight_var["step2"]["basket_name"]);
    psychoJS.experiment.addData("p_points", p_points);
    psychoJS.experiment.addData("t_mult", p_mult);
    psychoJS.experiment.addData("p_fail_step1", p_failStep1_flag);
    psychoJS.experiment.addData("p_fail_step2", p_failStep2_flag);
    psychoJS.experiment.addData("p_reward_flag", p_reward_flag);
    psychoJS.experiment.addData("p_step1_choice", p_step1_choice["name"]);
    psychoJS.experiment.addData("p_step2_stim", p_step2_stim_var["name"]);
    psychoJS.experiment.addData("p_step2_basket", p_step2_stim_var["basket_name"]);
    psychoJS.experiment.addData("p_score", p_score);
    p_index += 1;
    
    // keep track of which components have finished
    p_dataComponents = [];
    
    p_dataComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function p_dataRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'p_data' ---
    // get current time
    t = p_dataClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    p_dataComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function p_dataRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'p_data' ---
    p_dataComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "p_data" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _t_instructions_keyresp_allKeys;
var t_instructionsComponents;
function t_instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_instructions' ---
    t = 0;
    t_instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    t_instructions_keyresp.keys = undefined;
    t_instructions_keyresp.rt = undefined;
    _t_instructions_keyresp_allKeys = [];
    // keep track of which components have finished
    t_instructionsComponents = [];
    t_instructionsComponents.push(t_instructions_img);
    t_instructionsComponents.push(t_instructions_keyresp);
    
    t_instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_instructions' ---
    // get current time
    t = t_instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *t_instructions_img* updates
    if (t >= 0.0 && t_instructions_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_instructions_img.tStart = t;  // (not accounting for frame time here)
      t_instructions_img.frameNStart = frameN;  // exact frame index
      
      t_instructions_img.setAutoDraw(true);
    }
    
    
    // *t_instructions_keyresp* updates
    if (t >= 0 && t_instructions_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_instructions_keyresp.tStart = t;  // (not accounting for frame time here)
      t_instructions_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      t_instructions_keyresp.clock.reset();
      t_instructions_keyresp.start();
      t_instructions_keyresp.clearEvents();
    }
    
    if (t_instructions_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = t_instructions_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _t_instructions_keyresp_allKeys = _t_instructions_keyresp_allKeys.concat(theseKeys);
      if (_t_instructions_keyresp_allKeys.length > 0) {
        t_instructions_keyresp.keys = _t_instructions_keyresp_allKeys[_t_instructions_keyresp_allKeys.length - 1].name;  // just the last key pressed
        t_instructions_keyresp.rt = _t_instructions_keyresp_allKeys[_t_instructions_keyresp_allKeys.length - 1].rt;
        t_instructions_keyresp.duration = _t_instructions_keyresp_allKeys[_t_instructions_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_instructions' ---
    t_instructionsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(t_instructions_keyresp.corr, level);
    }
    psychoJS.experiment.addData('t_instructions_keyresp.keys', t_instructions_keyresp.keys);
    if (typeof t_instructions_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('t_instructions_keyresp.rt', t_instructions_keyresp.rt);
        psychoJS.experiment.addData('t_instructions_keyresp.duration', t_instructions_keyresp.duration);
        routineTimer.reset();
        }
    
    t_instructions_keyresp.stop();
    // the Routine "t_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var gotValidClick;
var t_advice_readingComponents;
function t_advice_readingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_advice_reading' ---
    t = 0;
    t_advice_readingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('t_advice_reading.started', globalClock.getTime());
    // setup some python lists for storing info about the t_advice_mouse
    // current position of the mouse:
    t_advice_mouse.x = [];
    t_advice_mouse.y = [];
    t_advice_mouse.leftButton = [];
    t_advice_mouse.midButton = [];
    t_advice_mouse.rightButton = [];
    t_advice_mouse.time = [];
    t_advice_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    t_advice_readingComponents = [];
    t_advice_readingComponents.push(t_advice_textbox);
    t_advice_readingComponents.push(t_advice_mouse);
    t_advice_readingComponents.push(t_advice_finished_typing_rect);
    t_advice_readingComponents.push(t_advice_finished_typing_txt);
    
    t_advice_readingComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
var _mouseXYs;
function t_advice_readingRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_advice_reading' ---
    // get current time
    t = t_advice_readingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *t_advice_textbox* updates
    if (t >= 0.0 && t_advice_textbox.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_advice_textbox.tStart = t;  // (not accounting for frame time here)
      t_advice_textbox.frameNStart = frameN;  // exact frame index
      
      t_advice_textbox.setAutoDraw(true);
    }
    
    // *t_advice_mouse* updates
    if (t >= 0.0 && t_advice_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_advice_mouse.tStart = t;  // (not accounting for frame time here)
      t_advice_mouse.frameNStart = frameN;  // exact frame index
      
      t_advice_mouse.status = PsychoJS.Status.STARTED;
      t_advice_mouse.mouseClock.reset();
      prevButtonState = t_advice_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (t_advice_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = t_advice_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [t_advice_finished_typing_rect]) {
            if (obj.contains(t_advice_mouse)) {
              gotValidClick = true;
              t_advice_mouse.clicked_name.push(obj.name)
            }
          }
          _mouseXYs = t_advice_mouse.getPos();
          t_advice_mouse.x.push(_mouseXYs[0]);
          t_advice_mouse.y.push(_mouseXYs[1]);
          t_advice_mouse.leftButton.push(_mouseButtons[0]);
          t_advice_mouse.midButton.push(_mouseButtons[1]);
          t_advice_mouse.rightButton.push(_mouseButtons[2]);
          t_advice_mouse.time.push(t_advice_mouse.mouseClock.getTime());
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *t_advice_finished_typing_rect* updates
    if (t >= 0.0 && t_advice_finished_typing_rect.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_advice_finished_typing_rect.tStart = t;  // (not accounting for frame time here)
      t_advice_finished_typing_rect.frameNStart = frameN;  // exact frame index
      
      t_advice_finished_typing_rect.setAutoDraw(true);
    }
    
    
    // *t_advice_finished_typing_txt* updates
    if (t >= 0.0 && t_advice_finished_typing_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_advice_finished_typing_txt.tStart = t;  // (not accounting for frame time here)
      t_advice_finished_typing_txt.frameNStart = frameN;  // exact frame index
      
      t_advice_finished_typing_txt.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_advice_readingComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_advice_readingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_advice_reading' ---
    t_advice_readingComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('t_advice_reading.stopped', globalClock.getTime());
    // store data for psychoJS.experiment (ExperimentHandler)
    if (t_advice_mouse.x) {  psychoJS.experiment.addData('t_advice_mouse.x', t_advice_mouse.x[0])};
    if (t_advice_mouse.y) {  psychoJS.experiment.addData('t_advice_mouse.y', t_advice_mouse.y[0])};
    if (t_advice_mouse.leftButton) {  psychoJS.experiment.addData('t_advice_mouse.leftButton', t_advice_mouse.leftButton[0])};
    if (t_advice_mouse.midButton) {  psychoJS.experiment.addData('t_advice_mouse.midButton', t_advice_mouse.midButton[0])};
    if (t_advice_mouse.rightButton) {  psychoJS.experiment.addData('t_advice_mouse.rightButton', t_advice_mouse.rightButton[0])};
    if (t_advice_mouse.time) {  psychoJS.experiment.addData('t_advice_mouse.time', t_advice_mouse.time[0])};
    if (t_advice_mouse.clicked_name) {  psychoJS.experiment.addData('t_advice_mouse.clicked_name', t_advice_mouse.clicked_name[0])};
    
    // the Routine "t_advice_reading" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var chr_counter;
var t_advice_summaryComponents;
function t_advice_summaryRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_advice_summary' ---
    t = 0;
    t_advice_summaryClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    t_advice_summary_textbox.setText('');
    t_advice_summary_textbox.refresh();
    // setup some python lists for storing info about the t_advice_summary_mouse
    // current position of the mouse:
    t_advice_summary_mouse.x = [];
    t_advice_summary_mouse.y = [];
    t_advice_summary_mouse.leftButton = [];
    t_advice_summary_mouse.midButton = [];
    t_advice_summary_mouse.rightButton = [];
    t_advice_summary_mouse.time = [];
    t_advice_summary_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // Run 'Begin Routine' code from t_advice_summary_code
    chr_counter = (("Character counter\n " + t_advice_summary_textbox.text.length.toString()) + " / 2000");
    
    // keep track of which components have finished
    t_advice_summaryComponents = [];
    t_advice_summaryComponents.push(t_advice_summary_textbox);
    t_advice_summaryComponents.push(t_advice_summary_finished_typing_rect);
    t_advice_summaryComponents.push(t_advice_summary_finished_typing_txt);
    t_advice_summaryComponents.push(t_advice_summary_txt);
    t_advice_summaryComponents.push(t_advice_summary_mouse);
    t_advice_summaryComponents.push(t_advice_summary_instructinos);
    
    t_advice_summaryComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_advice_summaryRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_advice_summary' ---
    // get current time
    t = t_advice_summaryClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *t_advice_summary_textbox* updates
    if (t >= 0.0 && t_advice_summary_textbox.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_advice_summary_textbox.tStart = t;  // (not accounting for frame time here)
      t_advice_summary_textbox.frameNStart = frameN;  // exact frame index
      
      t_advice_summary_textbox.setAutoDraw(true);
    }
    
    
    // *t_advice_summary_finished_typing_rect* updates
    if (t >= 0.0 && t_advice_summary_finished_typing_rect.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_advice_summary_finished_typing_rect.tStart = t;  // (not accounting for frame time here)
      t_advice_summary_finished_typing_rect.frameNStart = frameN;  // exact frame index
      
      t_advice_summary_finished_typing_rect.setAutoDraw(true);
    }
    
    
    // *t_advice_summary_finished_typing_txt* updates
    if (t >= 0.0 && t_advice_summary_finished_typing_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_advice_summary_finished_typing_txt.tStart = t;  // (not accounting for frame time here)
      t_advice_summary_finished_typing_txt.frameNStart = frameN;  // exact frame index
      
      t_advice_summary_finished_typing_txt.setAutoDraw(true);
    }
    
    
    if (t_advice_summary_txt.status === PsychoJS.Status.STARTED){ // only update if being drawn
      t_advice_summary_txt.setText(chr_counter, false);
    }
    
    // *t_advice_summary_txt* updates
    if (t >= 0.0 && t_advice_summary_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_advice_summary_txt.tStart = t;  // (not accounting for frame time here)
      t_advice_summary_txt.frameNStart = frameN;  // exact frame index
      
      t_advice_summary_txt.setAutoDraw(true);
    }
    
    // *t_advice_summary_mouse* updates
    if (t >= 0.0 && t_advice_summary_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_advice_summary_mouse.tStart = t;  // (not accounting for frame time here)
      t_advice_summary_mouse.frameNStart = frameN;  // exact frame index
      
      t_advice_summary_mouse.status = PsychoJS.Status.STARTED;
      t_advice_summary_mouse.mouseClock.reset();
      prevButtonState = t_advice_summary_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (t_advice_summary_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = t_advice_summary_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [vb_finished_typing_rect]) {
            if (obj.contains(t_advice_summary_mouse)) {
              gotValidClick = true;
              t_advice_summary_mouse.clicked_name.push(obj.name)
            }
          }
          _mouseXYs = t_advice_summary_mouse.getPos();
          t_advice_summary_mouse.x.push(_mouseXYs[0]);
          t_advice_summary_mouse.y.push(_mouseXYs[1]);
          t_advice_summary_mouse.leftButton.push(_mouseButtons[0]);
          t_advice_summary_mouse.midButton.push(_mouseButtons[1]);
          t_advice_summary_mouse.rightButton.push(_mouseButtons[2]);
          t_advice_summary_mouse.time.push(t_advice_summary_mouse.mouseClock.getTime());
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // Run 'Each Frame' code from t_advice_summary_code
    if ((t_advice_summary_textbox.text.length >= 1)) {
        chr_counter = (("Character counter\n " + t_advice_summary_textbox.text.length.toString()) + " / 2000");
    }
    if ((t_advice_summary_textbox.text.length > 2000)) {
        t_advice_summary_textbox.text = t_advice_summary_textbox.text.slice(0, 2001);
    }
    
    
    // *t_advice_summary_instructinos* updates
    if (t >= 0.0 && t_advice_summary_instructinos.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_advice_summary_instructinos.tStart = t;  // (not accounting for frame time here)
      t_advice_summary_instructinos.frameNStart = frameN;  // exact frame index
      
      t_advice_summary_instructinos.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_advice_summaryComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_advice_summaryRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_advice_summary' ---
    t_advice_summaryComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('t_advice_summary_textbox.text',t_advice_summary_textbox.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    if (t_advice_summary_mouse.x) {  psychoJS.experiment.addData('t_advice_summary_mouse.x', t_advice_summary_mouse.x[0])};
    if (t_advice_summary_mouse.y) {  psychoJS.experiment.addData('t_advice_summary_mouse.y', t_advice_summary_mouse.y[0])};
    if (t_advice_summary_mouse.leftButton) {  psychoJS.experiment.addData('t_advice_summary_mouse.leftButton', t_advice_summary_mouse.leftButton[0])};
    if (t_advice_summary_mouse.midButton) {  psychoJS.experiment.addData('t_advice_summary_mouse.midButton', t_advice_summary_mouse.midButton[0])};
    if (t_advice_summary_mouse.rightButton) {  psychoJS.experiment.addData('t_advice_summary_mouse.rightButton', t_advice_summary_mouse.rightButton[0])};
    if (t_advice_summary_mouse.time) {  psychoJS.experiment.addData('t_advice_summary_mouse.time', t_advice_summary_mouse.time[0])};
    if (t_advice_summary_mouse.clicked_name) {  psychoJS.experiment.addData('t_advice_summary_mouse.clicked_name', t_advice_summary_mouse.clicked_name[0])};
    
    // the Routine "t_advice_summary" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _t_instructions_2_keyresp_allKeys;
var t_instructions_2Components;
function t_instructions_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_instructions_2' ---
    t = 0;
    t_instructions_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    t_instructions_2_keyresp.keys = undefined;
    t_instructions_2_keyresp.rt = undefined;
    _t_instructions_2_keyresp_allKeys = [];
    // keep track of which components have finished
    t_instructions_2Components = [];
    t_instructions_2Components.push(t_instructions_2_img);
    t_instructions_2Components.push(t_instructions_2_keyresp);
    
    t_instructions_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_instructions_2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_instructions_2' ---
    // get current time
    t = t_instructions_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *t_instructions_2_img* updates
    if (t >= 0.0 && t_instructions_2_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_instructions_2_img.tStart = t;  // (not accounting for frame time here)
      t_instructions_2_img.frameNStart = frameN;  // exact frame index
      
      t_instructions_2_img.setAutoDraw(true);
    }
    
    
    // *t_instructions_2_keyresp* updates
    if (t >= 0 && t_instructions_2_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_instructions_2_keyresp.tStart = t;  // (not accounting for frame time here)
      t_instructions_2_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      t_instructions_2_keyresp.clock.reset();
      t_instructions_2_keyresp.start();
      t_instructions_2_keyresp.clearEvents();
    }
    
    if (t_instructions_2_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = t_instructions_2_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _t_instructions_2_keyresp_allKeys = _t_instructions_2_keyresp_allKeys.concat(theseKeys);
      if (_t_instructions_2_keyresp_allKeys.length > 0) {
        t_instructions_2_keyresp.keys = _t_instructions_2_keyresp_allKeys[_t_instructions_2_keyresp_allKeys.length - 1].name;  // just the last key pressed
        t_instructions_2_keyresp.rt = _t_instructions_2_keyresp_allKeys[_t_instructions_2_keyresp_allKeys.length - 1].rt;
        t_instructions_2_keyresp.duration = _t_instructions_2_keyresp_allKeys[_t_instructions_2_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_instructions_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_instructions_2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_instructions_2' ---
    t_instructions_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(t_instructions_2_keyresp.corr, level);
    }
    psychoJS.experiment.addData('t_instructions_2_keyresp.keys', t_instructions_2_keyresp.keys);
    if (typeof t_instructions_2_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('t_instructions_2_keyresp.rt', t_instructions_2_keyresp.rt);
        psychoJS.experiment.addData('t_instructions_2_keyresp.duration', t_instructions_2_keyresp.duration);
        routineTimer.reset();
        }
    
    t_instructions_2_keyresp.stop();
    // the Routine "t_instructions_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var t_step2_flag;
var t_reward_flag;
var t_failStep1_flag;
var t_failStep2_flag;
var t_step1_pair;
var t_break_flag;
var t_step2_stim;
var t_step2_basket;
var t_mult_img;
var t_step1_stimLeft_var;
var t_step1_stimRight_var;
var t_step1_deact_img;
var t_step1_stimRight_file;
var t_step1_stimLeft_file;
var t_step1_stimRightDeact_file;
var t_step1_stimLeftDeact_file;
var t_stake_img;
var t_step1_bg_img;
var t_step1_leftStim_img;
var t_step1_rightStim_img;
var t_step1_highlight_img;
var t_step1_scoreBg_img;
var t_step1_score_txt;
var t_setupComponents;
function t_setupRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_setup' ---
    t = 0;
    t_setupClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from t_setup_code
    t_step2_flag = 0;
    t_reward_flag = 0;
    t_failStep1_flag = 0;
    t_failStep2_flag = 0;
    t_points = 0;
    t_step1_pair = [];
    t_break_flag = 0;
    stim = 0;
    // next is to ensure that the data collection is not stuck on previous trials
    t_step1_choice = "";
    t_step2_stim = "";
    t_step2_basket = "";
    
    t_mult_img = (("ressources/t_mult" + t_mult.toString() + "_img.png"));
    
    for (var i=0; i < l_t_step1_stims.length; i++){
        stim = l_t_step1_stims[i];
        console.log(stim);
        if (stim["pair"] === pair_index) {
            t_step1_pair.push(stim);
        }
    }
    
    
    
    console.log(t_step1_pair);
    
    shuffleArray(t_step1_pair);
    t_step1_stimLeft_var = t_step1_pair[0];
    t_step1_stimRight_var = t_step1_pair[1];
    
    t_step1_deact_img = "ressources/mush0.jpg";
    
    t_step1_stimRight_file = t_step1_stimRight_var["file"];
    t_step1_stimLeft_file = t_step1_stimLeft_var["file"];
    t_step1_stimRightDeact_file = t_step1_stimRight_var["deact_file"];
    t_step1_stimLeftDeact_file = t_step1_stimLeft_var["deact_file"];
    
    //IMG SETUP
    
    t_stake_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_stake_img', units : 'norm', 
        image : t_mult_img, mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [0.32, 0.55],
        color : new util.Color([0, 0, 0]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -5.0 
    });
    
    t_step1_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_step1_bg_img', units : 'norm', 
        image : 'ressources/step1_background.png', mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
    });
     
    t_step1_leftStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_step1_leftStim_img', units : undefined, 
        image : t_step1_stimLeft_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimLeft_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    t_step1_rightStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_step1_rightStim_img', units : undefined, 
        image : t_step1_stimRight_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimRight_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -4.0 
    });
    
    t_step1_highlight_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_step1_highlight_img', units : 'height', 
        image : 'ressources/highlight.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : undefined, size : global_highlight_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -5.0 
    });
    
    t_step1_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_step1_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -6.0 
    });
    
    t_step1_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 't_step1_score_txt',
        text: "SCORE: " + global_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -7.0 
    });
    
    
    
    
    // keep track of which components have finished
    t_setupComponents = [];
    
    t_setupComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_setupRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_setup' ---
    // get current time
    t = t_setupClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_setupComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_setupRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_setup' ---
    t_setupComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "t_setup" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var t_fixationComponents;
function t_fixationRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_fixation' ---
    t = 0;
    t_fixationClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    t_step1_bg_img.setAutoDraw(true);
    t_step1_scoreBg_img.setAutoDraw(true);
    t_step1_score_txt.setAutoDraw(true);
    // keep track of which components have finished
    t_fixationComponents = [];
    t_fixationComponents.push(t_fixation_mandatory_txt);
    
    t_fixationComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_fixationRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_fixation' ---
    // get current time
    t = t_fixationClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 0.5) {
        continueRoutine = false
    }
    
    // *t_fixation_mandatory_txt* updates
    if (t >= 0.0 && t_fixation_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_fixation_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      t_fixation_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      t_fixation_mandatory_txt.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_fixationComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_fixationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_fixation' ---
    t_fixationComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    t_step1_bg_img.setAutoDraw(false);
    t_step1_scoreBg_img.setAutoDraw(false);
    t_step1_score_txt.setAutoDraw(false);
    // the Routine "t_fixation" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var t_stakeComponents;
function t_stakeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_stake' ---
    t = 0;
    t_stakeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    t_stake_img.setAutoDraw(true);
    t_step1_bg_img.setAutoDraw(true);
    t_step1_scoreBg_img.setAutoDraw(true);
    t_step1_score_txt.setAutoDraw(true);
    // keep track of which components have finished
    t_stakeComponents = [];
    t_stakeComponents.push(t_stake_mandatory_txt);
    
    t_stakeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_stakeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_stake' ---
    // get current time
    t = t_stakeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1) {
        continueRoutine = false
    }
    
    // *t_stake_mandatory_txt* updates
    if (t >= 0.0 && t_stake_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_stake_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      t_stake_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      t_stake_mandatory_txt.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_stakeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_stakeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_stake' ---
    t_stakeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    t_stake_img.setAutoDraw(false);
    t_step1_bg_img.setAutoDraw(false);
    t_step1_scoreBg_img.setAutoDraw(false);
    t_step1_score_txt.setAutoDraw(false);
    // the Routine "t_stake" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _t_step1_keyresp_allKeys;
var t_step1Components;
function t_step1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_step1' ---
    t = 0;
    t_step1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.500000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from t_step1_image_code
    t_step1_bg_img.setAutoDraw(true);
    t_step1_leftStim_img.setAutoDraw(true);
    t_step1_rightStim_img.setAutoDraw(true);
    t_step1_scoreBg_img.setAutoDraw(true);
    t_step1_score_txt.setAutoDraw(true);
    
    t_step1_keyresp.keys = undefined;
    t_step1_keyresp.rt = undefined;
    _t_step1_keyresp_allKeys = [];
    // keep track of which components have finished
    t_step1Components = [];
    t_step1Components.push(t_step1_keyresp);
    
    t_step1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_step1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_step1' ---
    // get current time
    t = t_step1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1.5) {
        continueRoutine = false
    }
    if (_t_step1_keyresp_allKeys.length > 0) {
        if ((t_step1_keyresp.keys === "s")) {
            t_step1_highlight_img.setPos([(-0.5), 0.19]);
            t_step1_rightStim_img.setImage(t_step1_stimRightDeact_file);
            t_step1_highlight_img.setAutoDraw(true);
            t_step1_rightStim_img.setAutoDraw(true);
        } else {
            t_step1_highlight_img.setPos([0.5, 0.19]);
            t_step1_leftStim_img.setImage(t_step1_stimLeftDeact_file);
            t_step1_highlight_img.setAutoDraw(true);
            t_step1_leftStim_img.setAutoDraw(true);
        }
    }
    
    
    // *t_step1_keyresp* updates
    if (t >= 0 && t_step1_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_step1_keyresp.tStart = t;  // (not accounting for frame time here)
      t_step1_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      t_step1_keyresp.clock.reset();
      t_step1_keyresp.start();
      t_step1_keyresp.clearEvents();
    }
    
    frameRemains = 0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (t_step1_keyresp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      t_step1_keyresp.status = PsychoJS.Status.FINISHED;
        }
      
    if (t_step1_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = t_step1_keyresp.getKeys({keyList: ['s', 'k'], waitRelease: false});
      _t_step1_keyresp_allKeys = _t_step1_keyresp_allKeys.concat(theseKeys);
      if (_t_step1_keyresp_allKeys.length > 0) {
        t_step1_keyresp.keys = _t_step1_keyresp_allKeys[0].name;  // just the first key pressed
        t_step1_keyresp.rt = _t_step1_keyresp_allKeys[0].rt;
        t_step1_keyresp.duration = _t_step1_keyresp_allKeys[0].duration;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_step1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var t_step2_stimBg_file;
var t_step2_stimBg_deact_file;
var t_step2_stimBasket_file;
var t_reward_trialPoints_txt;
var t_step2_bg_img;
var t_step2_stim_img;
var t_step2_highlight_img;
var t_step2_scoreBg_img;
var t_step2_score_txt;
var t_failStep1_bg_img;
var t_failStep1_leftStim_img;
var t_failStep1_rightStim_img;
var t_failStep1_scoreBg_img;
var t_failStep1_score_txt;
var t_failStep2_bg_img;
var t_failStep2_stim_img;
var t_failStep2_scoreBg_img;
var t_failStep2_score_txt;
var t_fail_tooSlow_img;
function t_step1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_step1' ---
    t_step1Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if (_t_step1_keyresp_allKeys.length > 0) {
        t_step2_flag = 1;
        if ((t_step1_keyresp.keys === "s")) {
            t_step1_choice = t_step1_stimLeft_var;
        } else {
            t_step1_choice = t_step1_stimRight_var;
        }
        t_step2_stim_var = t_step1_choice["step2"];
        t_step2_stimBg_file = t_step2_stim_var["file"];
        t_step2_stimBg_deact_file = t_step2_stim_var["deact_file"];
        t_step2_stimBasket_file = t_step2_stim_var["basket_file"];
        t_points = t_step2_stim_var["reward"] * t_mult;
        if ((t_points === 0)) {
            t_reward_trialPoints_txt = "0";
        } else {
            t_reward_trialPoints_txt = ("+" + t_points.toString());
        }
    } else {
        t_failStep1_flag = 1;
    }
    
    // Run 'End Routine' code from t_step1_image_code
    t_step1_bg_img.setAutoDraw(false);
    t_step1_leftStim_img.setAutoDraw(false);
    t_step1_rightStim_img.setAutoDraw(false);
    t_step1_highlight_img.setAutoDraw(false);
    t_step1_scoreBg_img.setAutoDraw(false);
    t_step1_score_txt.setAutoDraw(false);
    
    //STEP2
    
    t_step2_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_step2_bg_img', units : 'norm', 
        image : t_step2_stimBg_file, mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
      });
    
    t_step2_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
      
    t_step2_stim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_step2_stim_img', units : 'height', 
        image : t_step2_stimBasket_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_pos, size : global_step2_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    t_step2_highlight_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_step2_highlight_img', units : undefined, 
        image : 'ressources/highlight.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_highlight_pos, size : [0.6, 0.6],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -4.0 
    });
    
    t_step2_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_step2_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -5.0 
    });
    
    t_step2_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 't_step2_score_txt',
        text: 'SCORE: ' + global_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -6.0 
    });
    
    //FAILSTEP1
    
    t_failStep1_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_failStep1_bg_img', units : 'norm', 
        image : 'ressources/step1_background_deact.png', mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
    });
    
    t_failStep1_leftStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_failStep1_leftStim_img', units : undefined, 
        image : t_step1_stimLeftDeact_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimLeft_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -1.0 
    });
    
    t_failStep1_rightStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_failStep1_rightStim_img', units : undefined, 
        image : t_step1_stimRightDeact_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimRight_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -2.0 
    });
    
    t_failStep1_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_failStep1_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    t_failStep1_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 't_fail_score_txt',
        text: 'SCORE: ' + global_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -4.0 
    });
    
    //FAILSTEP2
    
    t_failStep2_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_failStep2_bg_img', units : 'norm', 
        image : t_step2_stimBg_deact_file, mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
      });
    
    t_failStep2_stim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_failStep2_stim_img', units : 'height', 
        image : 'ressources/fail_basket.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_pos, size : global_step2_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -1.0 
    });
    
    t_failStep2_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_failStep2_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -2.0 
    });
    
    t_failStep2_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 't_failStep2_score_txt',
        text: 'SCORE: ' + global_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -3.0 
     });
     
     
    t_fail_tooSlow_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_fail_tooSlow_img', units : undefined, 
        image : 'ressources/t_tooSlow.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : t_tooSlow_pos, size : t_tooSlow_size,
        color : new util.Color([0, 0, 0]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(t_step1_keyresp.corr, level);
    }
    psychoJS.experiment.addData('t_step1_keyresp.keys', t_step1_keyresp.keys);
    if (typeof t_step1_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('t_step1_keyresp.rt', t_step1_keyresp.rt);
        psychoJS.experiment.addData('t_step1_keyresp.duration', t_step1_keyresp.duration);
        }
    
    t_step1_keyresp.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _t_step2_keyresp_allKeys;
var t_step2Components;
function t_step2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_step2' ---
    t = 0;
    t_step2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.500000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from t_step2_image_code
    t_step2_bg_img.setAutoDraw(true);
    t_step2_stim_img.setAutoDraw(true);
    t_step2_scoreBg_img.setAutoDraw(true);
    t_step2_score_txt.setAutoDraw(true);
    
    t_step2_keyresp.keys = undefined;
    t_step2_keyresp.rt = undefined;
    _t_step2_keyresp_allKeys = [];
    // keep track of which components have finished
    t_step2Components = [];
    t_step2Components.push(t_step2_keyresp);
    
    t_step2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_step2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_step2' ---
    // get current time
    t = t_step2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1.5) {
        continueRoutine = false
    }
    if (_t_step2_keyresp_allKeys.length > 0) {
        t_step2_highlight_img.setAutoDraw(true);
    }
    
    
    // *t_step2_keyresp* updates
    if (t >= 0.0 && t_step2_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_step2_keyresp.tStart = t;  // (not accounting for frame time here)
      t_step2_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      t_step2_keyresp.clock.reset();
      t_step2_keyresp.start();
      t_step2_keyresp.clearEvents();
    }
    
    frameRemains = 0.0 + 1.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (t_step2_keyresp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      t_step2_keyresp.status = PsychoJS.Status.FINISHED;
        }
      
    if (t_step2_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = t_step2_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _t_step2_keyresp_allKeys = _t_step2_keyresp_allKeys.concat(theseKeys);
      if (_t_step2_keyresp_allKeys.length > 0) {
        t_step2_keyresp.keys = _t_step2_keyresp_allKeys[0].name;  // just the first key pressed
        t_step2_keyresp.rt = _t_step2_keyresp_allKeys[0].rt;
        t_step2_keyresp.duration = _t_step2_keyresp_allKeys[0].duration;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_step2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var t_reward_bg_img;
var t_reward_step2Stim_img;
var t_reward_step2Highlight_img;
var t_reward_scoreBg_img;
var t_reward_rewardAmount_txt;
var t_reward_rewardAmountBg_img;
var t_reward_score_txt;
var t_reward_mushroom_img;
function t_step2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_step2' ---
    t_step2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Run 'End Routine' code from t_step2_code
    if ((t_step2_keyresp.keys === "space")) {
        t_reward_flag = 1;
        global_score = (global_score + t_points);
    } else {
        t_failStep2_flag = 1;
        t_points = 0;
    }
    
    // Run 'End Routine' code from t_step2_image_code
    t_step2_bg_img.setAutoDraw(false);
    t_step2_stim_img.setAutoDraw(false);
    t_step2_highlight_img.setAutoDraw(false);
    t_step2_scoreBg_img.setAutoDraw(false);
    t_step2_score_txt.setAutoDraw(false);
    
    r_points = t_points / t_mult;
    
    //REWARD
    
    t_reward_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_reward_bg_img', units : 'norm', 
        image : t_step2_stimBg_file, mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
    });
    
    t_reward_step2Stim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_reward_step2Stim_img', units : 'height', 
        image : t_step2_stimBasket_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_pos, size : global_step2_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -1.0 
    });
    
    t_reward_step2Highlight_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_reward_step2Highlight_img', units : undefined, 
        image : 'ressources/highlight.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_highlight_pos, size : [0.6, 0.6],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -2.0 
    });
    
    t_reward_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_reward_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    t_reward_rewardAmount_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 't_reward_rewardAmount_txt',
        text: t_reward_trialPoints_txt,
        font: 'Open Sance',
        units: undefined, 
        pos: [0, 0.35], height: 0.25,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -4.0 
    });
    
    t_reward_rewardAmountBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_reward_rewardAmountBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : global_rewardBg_pos, size : global_rewardBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.6,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    t_reward_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 't_reward_score_txt',
        text: "SCORE: " + global_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -6.0 
    });
    
    t_reward_mushroom_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_reward_mushroom_img', units : undefined, 
        image : (("ressources/mush" + r_points.toString()) + ".png"),
        mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : [0, 0.2], size : [0.5, 0.5],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -7.0 
    });
    
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(t_step2_keyresp.corr, level);
    }
    psychoJS.experiment.addData('t_step2_keyresp.keys', t_step2_keyresp.keys);
    if (typeof t_step2_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('t_step2_keyresp.rt', t_step2_keyresp.rt);
        psychoJS.experiment.addData('t_step2_keyresp.duration', t_step2_keyresp.duration);
        }
    
    t_step2_keyresp.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var t_reward_mushroom_var;
var t_rewardComponents;
function t_rewardRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_reward' ---
    t = 0;
    t_rewardClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from t_reward_code
    t_reward_mushroom_var = (("ressources/mush" + r_points.toString()) + ".png");
    
    t_reward_bg_img.setAutoDraw(true);
    t_reward_step2Stim_img.setAutoDraw(true);
    t_reward_step2Highlight_img.setAutoDraw(true);
    t_reward_scoreBg_img.setAutoDraw(true);
    t_reward_rewardAmountBg_img.setAutoDraw(true);
    t_reward_rewardAmount_txt.setAutoDraw(true);
    t_reward_score_txt.setAutoDraw(true);
    t_reward_mushroom_img.setAutoDraw(true);
    
    // keep track of which components have finished
    t_rewardComponents = [];
    t_rewardComponents.push(t_reward_mandatory_txt);
    
    t_rewardComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_rewardRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_reward' ---
    // get current time
    t = t_rewardClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 2) {
        continueRoutine = false
    }
    
    // *t_reward_mandatory_txt* updates
    if (t >= 0.0 && t_reward_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_reward_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      t_reward_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      t_reward_mandatory_txt.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_rewardComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_rewardRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_reward' ---
    t_rewardComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    t_reward_bg_img.setAutoDraw(false);
    t_reward_step2Stim_img.setAutoDraw(false);
    t_reward_step2Highlight_img.setAutoDraw(false);
    t_reward_scoreBg_img.setAutoDraw(false);
    t_reward_rewardAmountBg_img.setAutoDraw(false);
    t_reward_rewardAmount_txt.setAutoDraw(false);
    t_reward_score_txt.setAutoDraw(false);
    t_reward_mushroom_img.setAutoDraw(false);
    
    // the Routine "t_reward" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var t_failStep1Components;
function t_failStep1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_failStep1' ---
    t = 0;
    t_failStep1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    t_failStep1_bg_img.setAutoDraw(true);
    t_failStep1_leftStim_img.setAutoDraw(true);
    t_failStep1_rightStim_img.setAutoDraw(true);
    t_failStep1_scoreBg_img.setAutoDraw(true);
    t_failStep1_score_txt.setAutoDraw(true);
    t_fail_tooSlow_img.setAutoDraw(true);
    // keep track of which components have finished
    t_failStep1Components = [];
    t_failStep1Components.push(t_failStep1_mandatory_txt);
    
    t_failStep1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_failStep1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_failStep1' ---
    // get current time
    t = t_failStep1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1) {
        continueRoutine = false
    }
    
    // *t_failStep1_mandatory_txt* updates
    if (t >= 0.0 && t_failStep1_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_failStep1_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      t_failStep1_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      t_failStep1_mandatory_txt.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_failStep1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_failStep1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_failStep1' ---
    t_failStep1Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    t_failStep1_bg_img.setAutoDraw(false);
    t_failStep1_leftStim_img.setAutoDraw(false);
    t_failStep1_rightStim_img.setAutoDraw(false);
    t_failStep1_scoreBg_img.setAutoDraw(false);
    t_failStep1_score_txt.setAutoDraw(false);
    t_fail_tooSlow_img.setAutoDraw(false);
    // the Routine "t_failStep1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var t_failStep2Components;
function t_failStep2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_failStep2' ---
    t = 0;
    t_failStep2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    t_failStep2_bg_img.setAutoDraw(true);
    t_failStep2_stim_img.setAutoDraw(true);
    t_failStep2_scoreBg_img.setAutoDraw(true);
    t_failStep2_score_txt.setAutoDraw(true);
    t_fail_tooSlow_img.setAutoDraw(true);
    // keep track of which components have finished
    t_failStep2Components = [];
    t_failStep2Components.push(t_failStep2_mandatory_txt);
    
    t_failStep2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_failStep2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_failStep2' ---
    // get current time
    t = t_failStep2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1) {
        continueRoutine = false
    }
    
    // *t_failStep2_mandatory_txt* updates
    if (t >= 0.0 && t_failStep2_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_failStep2_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      t_failStep2_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      t_failStep2_mandatory_txt.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_failStep2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_failStep2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_failStep2' ---
    t_failStep2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    t_failStep2_bg_img.setAutoDraw(false);
    t_failStep2_stim_img.setAutoDraw(false);
    t_failStep2_scoreBg_img.setAutoDraw(false);
    t_failStep2_score_txt.setAutoDraw(false);
    t_fail_tooSlow_img.setAutoDraw(false);
    // the Routine "t_failStep2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var t_dataComponents;
function t_dataRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_data' ---
    t = 0;
    t_dataClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from t_data_code
    psychoJS.experiment.addData("t_step1_pair_index", pair_index);
    psychoJS.experiment.addData("t_step1_stimLeft_name", t_step1_stimLeft_var["name"]);
    psychoJS.experiment.addData("t_step1_stimLeft_pair", t_step1_stimLeft_var["pair"]);
    psychoJS.experiment.addData("t_step1_stimLeft_reward", t_step1_stimLeft_var["step2"]["reward"]);
    psychoJS.experiment.addData("t_step1_stimLeft_step2Stim", t_step1_stimLeft_var["step2"]["name"]);
    psychoJS.experiment.addData("t_step1_stimLeft_step2Basket", t_step1_stimLeft_var["step2"]["basket_name"]);
    psychoJS.experiment.addData("t_step1_stimRight_name", t_step1_stimRight_var["name"]);
    psychoJS.experiment.addData("t_step1_stimRight_pair", t_step1_stimRight_var["pair"]);
    psychoJS.experiment.addData("t_step1_stimRight_reward", t_step1_stimRight_var["step2"]["reward"]);
    psychoJS.experiment.addData("t_step1_stimRight_step2Stim", t_step1_stimRight_var["step2"]["name"]);
    psychoJS.experiment.addData("t_step1_stimRight_step2Basket", t_step1_stimRight_var["step2"]["basket_name"]);
    psychoJS.experiment.addData("t_points", t_points);
    psychoJS.experiment.addData("t_mult", t_mult);
    psychoJS.experiment.addData("t_fail_step1", t_failStep1_flag);
    psychoJS.experiment.addData("t_fail_step2", t_failStep2_flag);
    psychoJS.experiment.addData("t_reward_flag", t_reward_flag);
    psychoJS.experiment.addData("t_step1_choice", t_step1_choice["name"]);
    psychoJS.experiment.addData("t_step2_stim", t_step2_stim_var["name"]);
    psychoJS.experiment.addData("t_step2_basket", t_step2_stim_var["basket_name"]);
    psychoJS.experiment.addData("globa_score", global_score);
    
    //half break
    if ((t_n_trial*4 == trials.thisN+1)) { //*4 for number of pair (fullRandom trial, for 256 trial, 32*4=128)
            t_break_flag = 1;
        }
    
    //first quarter break
    if ((t_n_trial*2 == trials.thisN+1)) { //*2 for number of pair (fullRandom trial, for 256 trial, 32*2=64)
            t_break_flag = 1;
        }
    
    //third quarter break
    if ((t_n_trial*6 == trials.thisN+1)) { //*6 for number of pair (fullRandom trial, for 256 trial, 32*6=192)
            t_break_flag = 1;
        }
    
    // keep track of which components have finished
    t_dataComponents = [];
    
    t_dataComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function t_dataRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_data' ---
    // get current time
    t = t_dataClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_dataComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var t_data_stimWalk0;
var t_data_stimWalk1;
var l_t_data_stimWalk;
function t_dataRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_data' ---
    t_dataComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // Run 'End Routine' code from t_data_code
    t_data_stimWalk0 = Math.round(generateRandomFromGaussian(0, 2));
    t_data_stimWalk1 = Math.round(generateRandomFromGaussian(0, 2));
    l_t_data_stimWalk = [t_data_stimWalk0, t_data_stimWalk1];
    for (var i, _pj_c = 0, _pj_a = util.range(l_t_step2_stims.length), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        stim = l_t_step2_stims[i];
        stim["reward"] += l_t_data_stimWalk[i];
        stim["reward"] = Math.min(stim["reward"], Math.max(9*2 - stim["reward"], 0));
        stim["reward"] = Math.max(stim["reward"], Math.min(0*2 - stim["reward"], 9));
    }
    psychoJS.experiment.addData("t_data_stimWalk0", t_data_stimWalk0);
    psychoJS.experiment.addData("t_data_stimWalk1", t_data_stimWalk1);
    
    // the Routine "t_data" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var initialTime;
var oldTime;
var _break_key_resp_allKeys;
var t_breakComponents;
function t_breakRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_break' ---
    t = 0;
    t_breakClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    initialTime = 150;
    myClock.reset();
    myClock.add(initialTime);
    oldTime = initialTime;
    t_break_clock_text.setAutoDraw(true);
    
    break_key_resp.keys = undefined;
    break_key_resp.rt = undefined;
    _break_key_resp_allKeys = [];
    // keep track of which components have finished
    t_breakComponents = [];
    t_breakComponents.push(break_key_resp);
    t_breakComponents.push(t_break_img);
    t_breakComponents.push(t_break_advice_textbox);
    t_breakComponents.push(t_break_clock_text);
    
    t_breakComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var newTime;
var mins;
var secs;
function t_breakRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_break' ---
    // get current time
    t = t_breakClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 300) {
        continueRoutine = false
    }
    newTime = initialTime - myClock.getTime();
    mins = Math.floor((newTime / 60));
    secs = (newTime % 60);
    if ((newTime !== oldTime)) {
        t_break_clock_text.text = ((Number.parseInt(mins).toString().padStart(1,"0") + ":") + Number.parseInt(secs).toString().padStart(2,"0"));
      oldTime = newTime;
    }
    
    
    // *break_key_resp* updates
    if (t >= 0.0 && break_key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      break_key_resp.tStart = t;  // (not accounting for frame time here)
      break_key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { break_key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { break_key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { break_key_resp.clearEvents(); });
    }
    
    if (break_key_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = break_key_resp.getKeys({keyList: ['space'], waitRelease: false});
      _break_key_resp_allKeys = _break_key_resp_allKeys.concat(theseKeys);
      if (_break_key_resp_allKeys.length > 0) {
        break_key_resp.keys = _break_key_resp_allKeys[_break_key_resp_allKeys.length - 1].name;  // just the last key pressed
        break_key_resp.rt = _break_key_resp_allKeys[_break_key_resp_allKeys.length - 1].rt;
        break_key_resp.duration = _break_key_resp_allKeys[_break_key_resp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *t_break_img* updates
    if (t >= 0.0 && t_break_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_break_img.tStart = t;  // (not accounting for frame time here)
      t_break_img.frameNStart = frameN;  // exact frame index
      
      t_break_img.setAutoDraw(true);
    }
    
    
    // *t_break_advice_textbox* updates
    if (t >= 0.0 && t_break_advice_textbox.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_break_advice_textbox.tStart = t;  // (not accounting for frame time here)
      t_break_advice_textbox.frameNStart = frameN;  // exact frame index
      
      t_break_advice_textbox.setAutoDraw(true);
    }
    
    
    // *t_break_clock_text* updates
    if (t >= 0.0 && t_break_clock_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_break_clock_text.tStart = t;  // (not accounting for frame time here)
      t_break_clock_text.frameNStart = frameN;  // exact frame index
      
      t_break_clock_text.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    t_breakComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_breakRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_break' ---
    t_breakComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    t_break_clock_text.setAutoDraw(false);
    
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(break_key_resp.corr, level);
    }
    psychoJS.experiment.addData('break_key_resp.keys', break_key_resp.keys);
    if (typeof break_key_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('break_key_resp.rt', break_key_resp.rt);
        psychoJS.experiment.addData('break_key_resp.duration', break_key_resp.duration);
        routineTimer.reset();
        }
    
    break_key_resp.stop();
    // the Routine "t_break" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _pl_global_instructions_keyresp_allKeys;
var pl_global_instructionsComponents;
function pl_global_instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl_global_instructions' ---
    t = 0;
    pl_global_instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pl_global_instructions_keyresp.keys = undefined;
    pl_global_instructions_keyresp.rt = undefined;
    _pl_global_instructions_keyresp_allKeys = [];
    // keep track of which components have finished
    pl_global_instructionsComponents = [];
    pl_global_instructionsComponents.push(pl_global_instructions_img);
    pl_global_instructionsComponents.push(pl_global_instructions_keyresp);
    
    pl_global_instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl_global_instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl_global_instructions' ---
    // get current time
    t = pl_global_instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pl_global_instructions_img* updates
    if (t >= 0.0 && pl_global_instructions_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl_global_instructions_img.tStart = t;  // (not accounting for frame time here)
      pl_global_instructions_img.frameNStart = frameN;  // exact frame index
      
      pl_global_instructions_img.setAutoDraw(true);
    }
    
    
    // *pl_global_instructions_keyresp* updates
    if (t >= 0.0 && pl_global_instructions_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl_global_instructions_keyresp.tStart = t;  // (not accounting for frame time here)
      pl_global_instructions_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      pl_global_instructions_keyresp.clock.reset();
      pl_global_instructions_keyresp.start();
      pl_global_instructions_keyresp.clearEvents();
    }
    
    if (pl_global_instructions_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pl_global_instructions_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _pl_global_instructions_keyresp_allKeys = _pl_global_instructions_keyresp_allKeys.concat(theseKeys);
      if (_pl_global_instructions_keyresp_allKeys.length > 0) {
        pl_global_instructions_keyresp.keys = _pl_global_instructions_keyresp_allKeys[_pl_global_instructions_keyresp_allKeys.length - 1].name;  // just the last key pressed
        pl_global_instructions_keyresp.rt = _pl_global_instructions_keyresp_allKeys[_pl_global_instructions_keyresp_allKeys.length - 1].rt;
        pl_global_instructions_keyresp.duration = _pl_global_instructions_keyresp_allKeys[_pl_global_instructions_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl_global_instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl_global_instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl_global_instructions' ---
    pl_global_instructionsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pl_global_instructions_keyresp.corr, level);
    }
    psychoJS.experiment.addData('pl_global_instructions_keyresp.keys', pl_global_instructions_keyresp.keys);
    if (typeof pl_global_instructions_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pl_global_instructions_keyresp.rt', pl_global_instructions_keyresp.rt);
        psychoJS.experiment.addData('pl_global_instructions_keyresp.duration', pl_global_instructions_keyresp.duration);
        routineTimer.reset();
        }
    
    pl_global_instructions_keyresp.stop();
    // the Routine "pl_global_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _vb_instructions_keyresp_allKeys;
var vb_instructionsComponents;
function vb_instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'vb_instructions' ---
    t = 0;
    vb_instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    vb_instructions_keyresp.keys = undefined;
    vb_instructions_keyresp.rt = undefined;
    _vb_instructions_keyresp_allKeys = [];
    // keep track of which components have finished
    vb_instructionsComponents = [];
    vb_instructionsComponents.push(vb_instructions_img);
    vb_instructionsComponents.push(vb_instructions_keyresp);
    
    vb_instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function vb_instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'vb_instructions' ---
    // get current time
    t = vb_instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *vb_instructions_img* updates
    if (t >= 0.0 && vb_instructions_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vb_instructions_img.tStart = t;  // (not accounting for frame time here)
      vb_instructions_img.frameNStart = frameN;  // exact frame index
      
      vb_instructions_img.setAutoDraw(true);
    }
    
    
    // *vb_instructions_keyresp* updates
    if (t >= 0.0 && vb_instructions_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vb_instructions_keyresp.tStart = t;  // (not accounting for frame time here)
      vb_instructions_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      vb_instructions_keyresp.clock.reset();
      vb_instructions_keyresp.start();
      vb_instructions_keyresp.clearEvents();
    }
    
    if (vb_instructions_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = vb_instructions_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _vb_instructions_keyresp_allKeys = _vb_instructions_keyresp_allKeys.concat(theseKeys);
      if (_vb_instructions_keyresp_allKeys.length > 0) {
        vb_instructions_keyresp.keys = _vb_instructions_keyresp_allKeys[_vb_instructions_keyresp_allKeys.length - 1].name;  // just the last key pressed
        vb_instructions_keyresp.rt = _vb_instructions_keyresp_allKeys[_vb_instructions_keyresp_allKeys.length - 1].rt;
        vb_instructions_keyresp.duration = _vb_instructions_keyresp_allKeys[_vb_instructions_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    vb_instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function vb_instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'vb_instructions' ---
    vb_instructionsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(vb_instructions_keyresp.corr, level);
    }
    psychoJS.experiment.addData('vb_instructions_keyresp.keys', vb_instructions_keyresp.keys);
    if (typeof vb_instructions_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('vb_instructions_keyresp.rt', vb_instructions_keyresp.rt);
        psychoJS.experiment.addData('vb_instructions_keyresp.duration', vb_instructions_keyresp.duration);
        routineTimer.reset();
        }
    
    vb_instructions_keyresp.stop();
    // the Routine "vb_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _vb_instructions_2_keyresp_allKeys;
var vb_instructions_2Components;
function vb_instructions_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'vb_instructions_2' ---
    t = 0;
    vb_instructions_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    vb_instructions_2_keyresp.keys = undefined;
    vb_instructions_2_keyresp.rt = undefined;
    _vb_instructions_2_keyresp_allKeys = [];
    // keep track of which components have finished
    vb_instructions_2Components = [];
    vb_instructions_2Components.push(vb_instructions_2_img);
    vb_instructions_2Components.push(vb_instructions_2_keyresp);
    
    vb_instructions_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function vb_instructions_2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'vb_instructions_2' ---
    // get current time
    t = vb_instructions_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *vb_instructions_2_img* updates
    if (t >= 0.0 && vb_instructions_2_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vb_instructions_2_img.tStart = t;  // (not accounting for frame time here)
      vb_instructions_2_img.frameNStart = frameN;  // exact frame index
      
      vb_instructions_2_img.setAutoDraw(true);
    }
    
    
    // *vb_instructions_2_keyresp* updates
    if (t >= 0.0 && vb_instructions_2_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vb_instructions_2_keyresp.tStart = t;  // (not accounting for frame time here)
      vb_instructions_2_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      vb_instructions_2_keyresp.clock.reset();
      vb_instructions_2_keyresp.start();
      vb_instructions_2_keyresp.clearEvents();
    }
    
    if (vb_instructions_2_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = vb_instructions_2_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _vb_instructions_2_keyresp_allKeys = _vb_instructions_2_keyresp_allKeys.concat(theseKeys);
      if (_vb_instructions_2_keyresp_allKeys.length > 0) {
        vb_instructions_2_keyresp.keys = _vb_instructions_2_keyresp_allKeys[_vb_instructions_2_keyresp_allKeys.length - 1].name;  // just the last key pressed
        vb_instructions_2_keyresp.rt = _vb_instructions_2_keyresp_allKeys[_vb_instructions_2_keyresp_allKeys.length - 1].rt;
        vb_instructions_2_keyresp.duration = _vb_instructions_2_keyresp_allKeys[_vb_instructions_2_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    vb_instructions_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function vb_instructions_2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'vb_instructions_2' ---
    vb_instructions_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(vb_instructions_2_keyresp.corr, level);
    }
    psychoJS.experiment.addData('vb_instructions_2_keyresp.keys', vb_instructions_2_keyresp.keys);
    if (typeof vb_instructions_2_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('vb_instructions_2_keyresp.rt', vb_instructions_2_keyresp.rt);
        psychoJS.experiment.addData('vb_instructions_2_keyresp.duration', vb_instructions_2_keyresp.duration);
        routineTimer.reset();
        }
    
    vb_instructions_2_keyresp.stop();
    // the Routine "vb_instructions_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var verbal_transmissionComponents;
function verbal_transmissionRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'verbal_transmission' ---
    t = 0;
    verbal_transmissionClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    vb_textbox.setText('');
    vb_textbox.refresh();
    // setup some python lists for storing info about the vb_mouse
    // current position of the mouse:
    vb_mouse.x = [];
    vb_mouse.y = [];
    vb_mouse.leftButton = [];
    vb_mouse.midButton = [];
    vb_mouse.rightButton = [];
    vb_mouse.time = [];
    vb_mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // Run 'Begin Routine' code from vb_code
    chr_counter = (("Character counter\n " + vb_textbox.text.length.toString()) + " / 2000");
    
    // keep track of which components have finished
    verbal_transmissionComponents = [];
    verbal_transmissionComponents.push(vb_textbox);
    verbal_transmissionComponents.push(vb_finished_typing_rect);
    verbal_transmissionComponents.push(vb_finished_typing_txt);
    verbal_transmissionComponents.push(vb_txt);
    verbal_transmissionComponents.push(vb_mouse);
    
    verbal_transmissionComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function verbal_transmissionRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'verbal_transmission' ---
    // get current time
    t = verbal_transmissionClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *vb_textbox* updates
    if (t >= 0.0 && vb_textbox.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vb_textbox.tStart = t;  // (not accounting for frame time here)
      vb_textbox.frameNStart = frameN;  // exact frame index
      
      vb_textbox.setAutoDraw(true);
    }
    
    
    // *vb_finished_typing_rect* updates
    if (t >= 0.0 && vb_finished_typing_rect.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vb_finished_typing_rect.tStart = t;  // (not accounting for frame time here)
      vb_finished_typing_rect.frameNStart = frameN;  // exact frame index
      
      vb_finished_typing_rect.setAutoDraw(true);
    }
    
    
    // *vb_finished_typing_txt* updates
    if (t >= 0.0 && vb_finished_typing_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vb_finished_typing_txt.tStart = t;  // (not accounting for frame time here)
      vb_finished_typing_txt.frameNStart = frameN;  // exact frame index
      
      vb_finished_typing_txt.setAutoDraw(true);
    }
    
    
    if (vb_txt.status === PsychoJS.Status.STARTED){ // only update if being drawn
      vb_txt.setText(chr_counter, false);
    }
    
    // *vb_txt* updates
    if (t >= 0.0 && vb_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vb_txt.tStart = t;  // (not accounting for frame time here)
      vb_txt.frameNStart = frameN;  // exact frame index
      
      vb_txt.setAutoDraw(true);
    }
    
    // *vb_mouse* updates
    if (t >= 0.0 && vb_mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vb_mouse.tStart = t;  // (not accounting for frame time here)
      vb_mouse.frameNStart = frameN;  // exact frame index
      
      vb_mouse.status = PsychoJS.Status.STARTED;
      vb_mouse.mouseClock.reset();
      prevButtonState = vb_mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (vb_mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = vb_mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [vb_finished_typing_rect]) {
            if (obj.contains(vb_mouse)) {
              gotValidClick = true;
              vb_mouse.clicked_name.push(obj.name)
            }
          }
          _mouseXYs = vb_mouse.getPos();
          vb_mouse.x.push(_mouseXYs[0]);
          vb_mouse.y.push(_mouseXYs[1]);
          vb_mouse.leftButton.push(_mouseButtons[0]);
          vb_mouse.midButton.push(_mouseButtons[1]);
          vb_mouse.rightButton.push(_mouseButtons[2]);
          vb_mouse.time.push(vb_mouse.mouseClock.getTime());
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // Run 'Each Frame' code from vb_code
    if ((vb_textbox.text.length >= 1)) {
        chr_counter = (("Character counter\n " + vb_textbox.text.length.toString()) + " / 2000");
    }
    if ((vb_textbox.text.length > 2000)) {
        vb_textbox.text = vb_textbox.text.slice(0, 2001);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    verbal_transmissionComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function verbal_transmissionRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'verbal_transmission' ---
    verbal_transmissionComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('vb_textbox.text',vb_textbox.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    if (vb_mouse.x) {  psychoJS.experiment.addData('vb_mouse.x', vb_mouse.x[0])};
    if (vb_mouse.y) {  psychoJS.experiment.addData('vb_mouse.y', vb_mouse.y[0])};
    if (vb_mouse.leftButton) {  psychoJS.experiment.addData('vb_mouse.leftButton', vb_mouse.leftButton[0])};
    if (vb_mouse.midButton) {  psychoJS.experiment.addData('vb_mouse.midButton', vb_mouse.midButton[0])};
    if (vb_mouse.rightButton) {  psychoJS.experiment.addData('vb_mouse.rightButton', vb_mouse.rightButton[0])};
    if (vb_mouse.time) {  psychoJS.experiment.addData('vb_mouse.time', vb_mouse.time[0])};
    if (vb_mouse.clicked_name) {  psychoJS.experiment.addData('vb_mouse.clicked_name', vb_mouse.clicked_name[0])};
    
    // the Routine "verbal_transmission" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _pl1_instructions1_keyresp_allKeys;
var pl1_instructions_1Components;
function pl1_instructions_1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl1_instructions_1' ---
    t = 0;
    pl1_instructions_1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pl1_instructions1_keyresp.keys = undefined;
    pl1_instructions1_keyresp.rt = undefined;
    _pl1_instructions1_keyresp_allKeys = [];
    // keep track of which components have finished
    pl1_instructions_1Components = [];
    pl1_instructions_1Components.push(pl1_instructions1_img);
    pl1_instructions_1Components.push(pl1_instructions1_keyresp);
    
    pl1_instructions_1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl1_instructions_1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl1_instructions_1' ---
    // get current time
    t = pl1_instructions_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pl1_instructions1_img* updates
    if (t >= 0.0 && pl1_instructions1_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_instructions1_img.tStart = t;  // (not accounting for frame time here)
      pl1_instructions1_img.frameNStart = frameN;  // exact frame index
      
      pl1_instructions1_img.setAutoDraw(true);
    }
    
    
    // *pl1_instructions1_keyresp* updates
    if (t >= 0.0 && pl1_instructions1_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_instructions1_keyresp.tStart = t;  // (not accounting for frame time here)
      pl1_instructions1_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      pl1_instructions1_keyresp.clock.reset();
      pl1_instructions1_keyresp.start();
      pl1_instructions1_keyresp.clearEvents();
    }
    
    if (pl1_instructions1_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pl1_instructions1_keyresp.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _pl1_instructions1_keyresp_allKeys = _pl1_instructions1_keyresp_allKeys.concat(theseKeys);
      if (_pl1_instructions1_keyresp_allKeys.length > 0) {
        pl1_instructions1_keyresp.keys = _pl1_instructions1_keyresp_allKeys[_pl1_instructions1_keyresp_allKeys.length - 1].name;  // just the last key pressed
        pl1_instructions1_keyresp.rt = _pl1_instructions1_keyresp_allKeys[_pl1_instructions1_keyresp_allKeys.length - 1].rt;
        pl1_instructions1_keyresp.duration = _pl1_instructions1_keyresp_allKeys[_pl1_instructions1_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl1_instructions_1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl1_instructions_1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl1_instructions_1' ---
    pl1_instructions_1Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pl1_instructions1_keyresp.corr, level);
    }
    psychoJS.experiment.addData('pl1_instructions1_keyresp.keys', pl1_instructions1_keyresp.keys);
    if (typeof pl1_instructions1_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pl1_instructions1_keyresp.rt', pl1_instructions1_keyresp.rt);
        psychoJS.experiment.addData('pl1_instructions1_keyresp.duration', pl1_instructions1_keyresp.duration);
        routineTimer.reset();
        }
    
    pl1_instructions1_keyresp.stop();
    // the Routine "pl1_instructions_1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _pl1_instructions2_keyresp_allKeys;
var pl1_instructions_2Components;
function pl1_instructions_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl1_instructions_2' ---
    t = 0;
    pl1_instructions_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pl1_instructions2_keyresp.keys = undefined;
    pl1_instructions2_keyresp.rt = undefined;
    _pl1_instructions2_keyresp_allKeys = [];
    // keep track of which components have finished
    pl1_instructions_2Components = [];
    pl1_instructions_2Components.push(pl1_instructions2_img);
    pl1_instructions_2Components.push(pl1_instructions2_keyresp);
    
    pl1_instructions_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl1_instructions_2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl1_instructions_2' ---
    // get current time
    t = pl1_instructions_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pl1_instructions2_img* updates
    if (t >= 0.0 && pl1_instructions2_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_instructions2_img.tStart = t;  // (not accounting for frame time here)
      pl1_instructions2_img.frameNStart = frameN;  // exact frame index
      
      pl1_instructions2_img.setAutoDraw(true);
    }
    
    
    // *pl1_instructions2_keyresp* updates
    if (t >= 0.0 && pl1_instructions2_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_instructions2_keyresp.tStart = t;  // (not accounting for frame time here)
      pl1_instructions2_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      pl1_instructions2_keyresp.clock.reset();
      pl1_instructions2_keyresp.start();
      pl1_instructions2_keyresp.clearEvents();
    }
    
    if (pl1_instructions2_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pl1_instructions2_keyresp.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _pl1_instructions2_keyresp_allKeys = _pl1_instructions2_keyresp_allKeys.concat(theseKeys);
      if (_pl1_instructions2_keyresp_allKeys.length > 0) {
        pl1_instructions2_keyresp.keys = _pl1_instructions2_keyresp_allKeys[_pl1_instructions2_keyresp_allKeys.length - 1].name;  // just the last key pressed
        pl1_instructions2_keyresp.rt = _pl1_instructions2_keyresp_allKeys[_pl1_instructions2_keyresp_allKeys.length - 1].rt;
        pl1_instructions2_keyresp.duration = _pl1_instructions2_keyresp_allKeys[_pl1_instructions2_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl1_instructions_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl1_instructions_2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl1_instructions_2' ---
    pl1_instructions_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pl1_instructions2_keyresp.corr, level);
    }
    psychoJS.experiment.addData('pl1_instructions2_keyresp.keys', pl1_instructions2_keyresp.keys);
    if (typeof pl1_instructions2_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pl1_instructions2_keyresp.rt', pl1_instructions2_keyresp.rt);
        psychoJS.experiment.addData('pl1_instructions2_keyresp.duration', pl1_instructions2_keyresp.duration);
        routineTimer.reset();
        }
    
    pl1_instructions2_keyresp.stop();
    // the Routine "pl1_instructions_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _pl1_instructions3_keyresp_allKeys;
var pl1_instructions_3Components;
function pl1_instructions_3RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl1_instructions_3' ---
    t = 0;
    pl1_instructions_3Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pl1_instructions3_keyresp.keys = undefined;
    pl1_instructions3_keyresp.rt = undefined;
    _pl1_instructions3_keyresp_allKeys = [];
    // keep track of which components have finished
    pl1_instructions_3Components = [];
    pl1_instructions_3Components.push(pl1_instructions3_img);
    pl1_instructions_3Components.push(pl1_instructions3_keyresp);
    
    pl1_instructions_3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl1_instructions_3RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl1_instructions_3' ---
    // get current time
    t = pl1_instructions_3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pl1_instructions3_img* updates
    if (t >= 0.0 && pl1_instructions3_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_instructions3_img.tStart = t;  // (not accounting for frame time here)
      pl1_instructions3_img.frameNStart = frameN;  // exact frame index
      
      pl1_instructions3_img.setAutoDraw(true);
    }
    
    
    // *pl1_instructions3_keyresp* updates
    if (t >= 0.0 && pl1_instructions3_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_instructions3_keyresp.tStart = t;  // (not accounting for frame time here)
      pl1_instructions3_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      pl1_instructions3_keyresp.clock.reset();
      pl1_instructions3_keyresp.start();
      pl1_instructions3_keyresp.clearEvents();
    }
    
    if (pl1_instructions3_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pl1_instructions3_keyresp.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _pl1_instructions3_keyresp_allKeys = _pl1_instructions3_keyresp_allKeys.concat(theseKeys);
      if (_pl1_instructions3_keyresp_allKeys.length > 0) {
        pl1_instructions3_keyresp.keys = _pl1_instructions3_keyresp_allKeys[_pl1_instructions3_keyresp_allKeys.length - 1].name;  // just the last key pressed
        pl1_instructions3_keyresp.rt = _pl1_instructions3_keyresp_allKeys[_pl1_instructions3_keyresp_allKeys.length - 1].rt;
        pl1_instructions3_keyresp.duration = _pl1_instructions3_keyresp_allKeys[_pl1_instructions3_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl1_instructions_3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl1_instructions_3RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl1_instructions_3' ---
    pl1_instructions_3Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pl1_instructions3_keyresp.corr, level);
    }
    psychoJS.experiment.addData('pl1_instructions3_keyresp.keys', pl1_instructions3_keyresp.keys);
    if (typeof pl1_instructions3_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pl1_instructions3_keyresp.rt', pl1_instructions3_keyresp.rt);
        psychoJS.experiment.addData('pl1_instructions3_keyresp.duration', pl1_instructions3_keyresp.duration);
        routineTimer.reset();
        }
    
    pl1_instructions3_keyresp.stop();
    // the Routine "pl1_instructions_3" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _pl1_instructions4_keyresp_allKeys;
var pl1_instructions_4Components;
function pl1_instructions_4RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl1_instructions_4' ---
    t = 0;
    pl1_instructions_4Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pl1_instructions4_keyresp.keys = undefined;
    pl1_instructions4_keyresp.rt = undefined;
    _pl1_instructions4_keyresp_allKeys = [];
    // keep track of which components have finished
    pl1_instructions_4Components = [];
    pl1_instructions_4Components.push(pl1_instructions4_img);
    pl1_instructions_4Components.push(pl1_instructions4_keyresp);
    
    pl1_instructions_4Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl1_instructions_4RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl1_instructions_4' ---
    // get current time
    t = pl1_instructions_4Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pl1_instructions4_img* updates
    if (t >= 0.0 && pl1_instructions4_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_instructions4_img.tStart = t;  // (not accounting for frame time here)
      pl1_instructions4_img.frameNStart = frameN;  // exact frame index
      
      pl1_instructions4_img.setAutoDraw(true);
    }
    
    
    // *pl1_instructions4_keyresp* updates
    if (t >= 0.0 && pl1_instructions4_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_instructions4_keyresp.tStart = t;  // (not accounting for frame time here)
      pl1_instructions4_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      pl1_instructions4_keyresp.clock.reset();
      pl1_instructions4_keyresp.start();
      pl1_instructions4_keyresp.clearEvents();
    }
    
    if (pl1_instructions4_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pl1_instructions4_keyresp.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _pl1_instructions4_keyresp_allKeys = _pl1_instructions4_keyresp_allKeys.concat(theseKeys);
      if (_pl1_instructions4_keyresp_allKeys.length > 0) {
        pl1_instructions4_keyresp.keys = _pl1_instructions4_keyresp_allKeys[_pl1_instructions4_keyresp_allKeys.length - 1].name;  // just the last key pressed
        pl1_instructions4_keyresp.rt = _pl1_instructions4_keyresp_allKeys[_pl1_instructions4_keyresp_allKeys.length - 1].rt;
        pl1_instructions4_keyresp.duration = _pl1_instructions4_keyresp_allKeys[_pl1_instructions4_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl1_instructions_4Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl1_instructions_4RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl1_instructions_4' ---
    pl1_instructions_4Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pl1_instructions4_keyresp.corr, level);
    }
    psychoJS.experiment.addData('pl1_instructions4_keyresp.keys', pl1_instructions4_keyresp.keys);
    if (typeof pl1_instructions4_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pl1_instructions4_keyresp.rt', pl1_instructions4_keyresp.rt);
        psychoJS.experiment.addData('pl1_instructions4_keyresp.duration', pl1_instructions4_keyresp.duration);
        routineTimer.reset();
        }
    
    pl1_instructions4_keyresp.stop();
    // the Routine "pl1_instructions_4" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var pl2_task_step2_index;
var pl2_task_stimLeft_var;
var pl2_task_stimRight_var;
var pl1_setupComponents;
function pl1_setupRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl1_setup' ---
    t = 0;
    pl1_setupClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pl2_task_step2_index = [stimLeft_index, stimRight_index];
    shuffleArray(pl2_task_step2_index);
    pl2_task_stimLeft_var = l_t_step1_stims[pl2_task_step2_index[0]];
    pl2_task_stimRight_var = l_t_step1_stims[pl2_task_step2_index[1]];
    
    // keep track of which components have finished
    pl1_setupComponents = [];
    
    pl1_setupComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl1_setupRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl1_setup' ---
    // get current time
    t = pl1_setupClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl1_setupComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl1_setupRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl1_setup' ---
    pl1_setupComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "pl1_setup" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _pl1_task_keyresp_allKeys;
var pl1_taskComponents;
function pl1_taskRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl1_task' ---
    t = 0;
    pl1_taskClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pl1_task_lickert.reset()
    pl1_task_confidence_lickert.reset()
    pl1_task_stimLeft_img.setImage(pl2_task_stimLeft_var["file"]);
    pl1_task_stimRight_img.setImage(pl2_task_stimRight_var["file"]);
    pl1_task_keyresp.keys = undefined;
    pl1_task_keyresp.rt = undefined;
    _pl1_task_keyresp_allKeys = [];
    // keep track of which components have finished
    pl1_taskComponents = [];
    pl1_taskComponents.push(pl1_task_lickert);
    pl1_taskComponents.push(pl1_task_confidence_lickert);
    pl1_taskComponents.push(pl1_task_stimLeft_img);
    pl1_taskComponents.push(pl1_task_stimRight_img);
    pl1_taskComponents.push(pl1_task_keyresp);
    pl1_taskComponents.push(pl1_task_fixation_txt);
    
    pl1_taskComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl1_taskRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl1_task' ---
    // get current time
    t = pl1_taskClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pl1_task_lickert* updates
    if (t >= 0.5 && pl1_task_lickert.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_task_lickert.tStart = t;  // (not accounting for frame time here)
      pl1_task_lickert.frameNStart = frameN;  // exact frame index
      
      pl1_task_lickert.setAutoDraw(true);
    }
    
    
    // *pl1_task_confidence_lickert* updates
    if (t >= 0.5 && pl1_task_confidence_lickert.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_task_confidence_lickert.tStart = t;  // (not accounting for frame time here)
      pl1_task_confidence_lickert.frameNStart = frameN;  // exact frame index
      
      pl1_task_confidence_lickert.setAutoDraw(true);
    }
    
    
    // *pl1_task_stimLeft_img* updates
    if (t >= 0.5 && pl1_task_stimLeft_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_task_stimLeft_img.tStart = t;  // (not accounting for frame time here)
      pl1_task_stimLeft_img.frameNStart = frameN;  // exact frame index
      
      pl1_task_stimLeft_img.setAutoDraw(true);
    }
    
    
    // *pl1_task_stimRight_img* updates
    if (t >= 0.5 && pl1_task_stimRight_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_task_stimRight_img.tStart = t;  // (not accounting for frame time here)
      pl1_task_stimRight_img.frameNStart = frameN;  // exact frame index
      
      pl1_task_stimRight_img.setAutoDraw(true);
    }
    
    
    // *pl1_task_keyresp* updates
    if (t >= 0.5 && pl1_task_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_task_keyresp.tStart = t;  // (not accounting for frame time here)
      pl1_task_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      pl1_task_keyresp.clock.reset();
      pl1_task_keyresp.start();
      pl1_task_keyresp.clearEvents();
    }
    
    if (pl1_task_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pl1_task_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _pl1_task_keyresp_allKeys = _pl1_task_keyresp_allKeys.concat(theseKeys);
      if (_pl1_task_keyresp_allKeys.length > 0) {
        pl1_task_keyresp.keys = _pl1_task_keyresp_allKeys[_pl1_task_keyresp_allKeys.length - 1].name;  // just the last key pressed
        pl1_task_keyresp.rt = _pl1_task_keyresp_allKeys[_pl1_task_keyresp_allKeys.length - 1].rt;
        pl1_task_keyresp.duration = _pl1_task_keyresp_allKeys[_pl1_task_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *pl1_task_fixation_txt* updates
    if (t >= 0.0 && pl1_task_fixation_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl1_task_fixation_txt.tStart = t;  // (not accounting for frame time here)
      pl1_task_fixation_txt.frameNStart = frameN;  // exact frame index
      
      pl1_task_fixation_txt.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pl1_task_fixation_txt.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pl1_task_fixation_txt.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl1_taskComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl1_taskRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl1_task' ---
    pl1_taskComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('pl1_task_lickert.response', pl1_task_lickert.getRating());
    psychoJS.experiment.addData('pl1_task_lickert.rt', pl1_task_lickert.getRT());
    psychoJS.experiment.addData('pl1_task_confidence_lickert.response', pl1_task_confidence_lickert.getRating());
    psychoJS.experiment.addData('pl1_task_confidence_lickert.rt', pl1_task_confidence_lickert.getRT());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pl1_task_keyresp.corr, level);
    }
    psychoJS.experiment.addData('pl1_task_keyresp.keys', pl1_task_keyresp.keys);
    if (typeof pl1_task_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pl1_task_keyresp.rt', pl1_task_keyresp.rt);
        psychoJS.experiment.addData('pl1_task_keyresp.duration', pl1_task_keyresp.duration);
        routineTimer.reset();
        }
    
    pl1_task_keyresp.stop();
    // the Routine "pl1_task" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var pl1_dataComponents;
function pl1_dataRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl1_data' ---
    t = 0;
    pl1_dataClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData("pl1_task_stimLeft", pl2_task_stimLeft_var["name"]);
    psychoJS.experiment.addData("pl1_task_stimRight", pl2_task_stimRight_var["name"]);
    
    // keep track of which components have finished
    pl1_dataComponents = [];
    
    pl1_dataComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl1_dataRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl1_data' ---
    // get current time
    t = pl1_dataClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl1_dataComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl1_dataRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl1_data' ---
    pl1_dataComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "pl1_data" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _pl2_instructions_keyresp_allKeys;
var pl2_instructionsComponents;
function pl2_instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl2_instructions' ---
    t = 0;
    pl2_instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pl2_instructions_keyresp.keys = undefined;
    pl2_instructions_keyresp.rt = undefined;
    _pl2_instructions_keyresp_allKeys = [];
    // keep track of which components have finished
    pl2_instructionsComponents = [];
    pl2_instructionsComponents.push(pl2_instructions_img);
    pl2_instructionsComponents.push(pl2_instructions_keyresp);
    
    pl2_instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl2_instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl2_instructions' ---
    // get current time
    t = pl2_instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pl2_instructions_img* updates
    if (t >= 0.0 && pl2_instructions_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl2_instructions_img.tStart = t;  // (not accounting for frame time here)
      pl2_instructions_img.frameNStart = frameN;  // exact frame index
      
      pl2_instructions_img.setAutoDraw(true);
    }
    
    
    // *pl2_instructions_keyresp* updates
    if (t >= 0.0 && pl2_instructions_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl2_instructions_keyresp.tStart = t;  // (not accounting for frame time here)
      pl2_instructions_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      pl2_instructions_keyresp.clock.reset();
      pl2_instructions_keyresp.start();
      pl2_instructions_keyresp.clearEvents();
    }
    
    if (pl2_instructions_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pl2_instructions_keyresp.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _pl2_instructions_keyresp_allKeys = _pl2_instructions_keyresp_allKeys.concat(theseKeys);
      if (_pl2_instructions_keyresp_allKeys.length > 0) {
        pl2_instructions_keyresp.keys = _pl2_instructions_keyresp_allKeys[_pl2_instructions_keyresp_allKeys.length - 1].name;  // just the last key pressed
        pl2_instructions_keyresp.rt = _pl2_instructions_keyresp_allKeys[_pl2_instructions_keyresp_allKeys.length - 1].rt;
        pl2_instructions_keyresp.duration = _pl2_instructions_keyresp_allKeys[_pl2_instructions_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl2_instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl2_instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl2_instructions' ---
    pl2_instructionsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pl2_instructions_keyresp.corr, level);
    }
    psychoJS.experiment.addData('pl2_instructions_keyresp.keys', pl2_instructions_keyresp.keys);
    if (typeof pl2_instructions_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pl2_instructions_keyresp.rt', pl2_instructions_keyresp.rt);
        psychoJS.experiment.addData('pl2_instructions_keyresp.duration', pl2_instructions_keyresp.duration);
        routineTimer.reset();
        }
    
    pl2_instructions_keyresp.stop();
    // the Routine "pl2_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var pl2_task_gnome_var;
var pl2_task_forest_var;
var pl2_setupComponents;
function pl2_setupRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl2_setup' ---
    t = 0;
    pl2_setupClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from pl2_setup_code
    pl2_task_gnome_var = l_t_step1_stims[gnome_id]
    pl2_task_forest_var = l_t_step2_stims[forest_id]
    // keep track of which components have finished
    pl2_setupComponents = [];
    
    pl2_setupComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl2_setupRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl2_setup' ---
    // get current time
    t = pl2_setupClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl2_setupComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl2_setupRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl2_setup' ---
    pl2_setupComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "pl2_setup" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _pl2_task_keyresp_allKeys;
var pl2_taskComponents;
function pl2_taskRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl2_task' ---
    t = 0;
    pl2_taskClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pl2_task_lickert.reset()
    pl2_task_confidence_lickert.reset()
    pl2_task_gnome_img.setImage(pl2_task_gnome_var["file"]);
    pl2_task_keyresp.keys = undefined;
    pl2_task_keyresp.rt = undefined;
    _pl2_task_keyresp_allKeys = [];
    pl2_task_forest_img.setImage(pl2_task_forest_var["file"]);
    pl2_task_basket_img.setImage(pl2_task_forest_var["basket_file"]);
    // keep track of which components have finished
    pl2_taskComponents = [];
    pl2_taskComponents.push(pl2_task_lickert);
    pl2_taskComponents.push(pl2_task_confidence_lickert);
    pl2_taskComponents.push(pl2_task_gnome_img);
    pl2_taskComponents.push(pl2_task_keyresp);
    pl2_taskComponents.push(pl2_task_forest_img);
    pl2_taskComponents.push(pl2_task_basket_img);
    pl2_taskComponents.push(pl2_task_fixation_txt);
    
    pl2_taskComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl2_taskRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl2_task' ---
    // get current time
    t = pl2_taskClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pl2_task_lickert* updates
    if (t >= 0.5 && pl2_task_lickert.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl2_task_lickert.tStart = t;  // (not accounting for frame time here)
      pl2_task_lickert.frameNStart = frameN;  // exact frame index
      
      pl2_task_lickert.setAutoDraw(true);
    }
    
    
    // *pl2_task_confidence_lickert* updates
    if (t >= 0.5 && pl2_task_confidence_lickert.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl2_task_confidence_lickert.tStart = t;  // (not accounting for frame time here)
      pl2_task_confidence_lickert.frameNStart = frameN;  // exact frame index
      
      pl2_task_confidence_lickert.setAutoDraw(true);
    }
    
    
    // *pl2_task_gnome_img* updates
    if (t >= 0.5 && pl2_task_gnome_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl2_task_gnome_img.tStart = t;  // (not accounting for frame time here)
      pl2_task_gnome_img.frameNStart = frameN;  // exact frame index
      
      pl2_task_gnome_img.setAutoDraw(true);
    }
    
    
    // *pl2_task_keyresp* updates
    if (t >= 0.5 && pl2_task_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl2_task_keyresp.tStart = t;  // (not accounting for frame time here)
      pl2_task_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      pl2_task_keyresp.clock.reset();
      pl2_task_keyresp.start();
      pl2_task_keyresp.clearEvents();
    }
    
    if (pl2_task_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pl2_task_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _pl2_task_keyresp_allKeys = _pl2_task_keyresp_allKeys.concat(theseKeys);
      if (_pl2_task_keyresp_allKeys.length > 0) {
        pl2_task_keyresp.keys = _pl2_task_keyresp_allKeys[_pl2_task_keyresp_allKeys.length - 1].name;  // just the last key pressed
        pl2_task_keyresp.rt = _pl2_task_keyresp_allKeys[_pl2_task_keyresp_allKeys.length - 1].rt;
        pl2_task_keyresp.duration = _pl2_task_keyresp_allKeys[_pl2_task_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *pl2_task_forest_img* updates
    if (t >= 0.5 && pl2_task_forest_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl2_task_forest_img.tStart = t;  // (not accounting for frame time here)
      pl2_task_forest_img.frameNStart = frameN;  // exact frame index
      
      pl2_task_forest_img.setAutoDraw(true);
    }
    
    
    // *pl2_task_basket_img* updates
    if (t >= 0.5 && pl2_task_basket_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl2_task_basket_img.tStart = t;  // (not accounting for frame time here)
      pl2_task_basket_img.frameNStart = frameN;  // exact frame index
      
      pl2_task_basket_img.setAutoDraw(true);
    }
    
    
    // *pl2_task_fixation_txt* updates
    if (t >= 0.0 && pl2_task_fixation_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pl2_task_fixation_txt.tStart = t;  // (not accounting for frame time here)
      pl2_task_fixation_txt.frameNStart = frameN;  // exact frame index
      
      pl2_task_fixation_txt.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pl2_task_fixation_txt.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pl2_task_fixation_txt.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl2_taskComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl2_taskRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl2_task' ---
    pl2_taskComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('pl2_task_lickert.response', pl2_task_lickert.getRating());
    psychoJS.experiment.addData('pl2_task_lickert.rt', pl2_task_lickert.getRT());
    psychoJS.experiment.addData('pl2_task_confidence_lickert.response', pl2_task_confidence_lickert.getRating());
    psychoJS.experiment.addData('pl2_task_confidence_lickert.rt', pl2_task_confidence_lickert.getRT());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(pl2_task_keyresp.corr, level);
    }
    psychoJS.experiment.addData('pl2_task_keyresp.keys', pl2_task_keyresp.keys);
    if (typeof pl2_task_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pl2_task_keyresp.rt', pl2_task_keyresp.rt);
        psychoJS.experiment.addData('pl2_task_keyresp.duration', pl2_task_keyresp.duration);
        routineTimer.reset();
        }
    
    pl2_task_keyresp.stop();
    // the Routine "pl2_task" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var pl2_dataComponents;
function pl2_dataRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pl2_data' ---
    t = 0;
    pl2_dataClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from pl2_data_code
    pl2_task_gnome_var = l_t_step1_stims[gnome_id]
    pl2_task_forest_var = l_t_step2_stims[forest_id]
    
    
    
    psychoJS.experiment.addData("pl2_task_gnome", pl2_task_gnome_var["name"]);
    psychoJS.experiment.addData("pl2_task_forest", pl2_task_forest_var["name"]);
    psychoJS.experiment.addData("pl2_task_basket", pl2_task_forest_var["basket_name"]);
    psychoJS.experiment.addData("pl2_task_lickert.response", pl2_task_lickert.getRating());
    psychoJS.experiment.addData("pl2_task_lickert.rt", pl2_task_lickert.getRT());
    psychoJS.experiment.addData("pl2_task_confidence_lickert.response", pl2_task_confidence_lickert.getRating());
    psychoJS.experiment.addData("pl2_task_confidence_lickert.rt", pl2_task_confidence_lickert.getRT());
    // keep track of which components have finished
    pl2_dataComponents = [];
    
    pl2_dataComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function pl2_dataRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pl2_data' ---
    // get current time
    t = pl2_dataClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    pl2_dataComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pl2_dataRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pl2_data' ---
    pl2_dataComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "pl2_data" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _end_keyresp_allKeys;
var endComponents;
function endRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'end' ---
    t = 0;
    endClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    end_keyresp.keys = undefined;
    end_keyresp.rt = undefined;
    _end_keyresp_allKeys = [];
    // keep track of which components have finished
    endComponents = [];
    endComponents.push(end_txt);
    endComponents.push(end_keyresp);
    
    endComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function endRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'end' ---
    // get current time
    t = endClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *end_txt* updates
    if (t >= 0.0 && end_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      end_txt.tStart = t;  // (not accounting for frame time here)
      end_txt.frameNStart = frameN;  // exact frame index
      
      end_txt.setAutoDraw(true);
    }
    
    
    // *end_keyresp* updates
    if (t >= 0.0 && end_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      end_keyresp.tStart = t;  // (not accounting for frame time here)
      end_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      end_keyresp.clock.reset();
      end_keyresp.start();
      end_keyresp.clearEvents();
    }
    
    if (end_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = end_keyresp.getKeys({keyList: ['space'], waitRelease: false});
      _end_keyresp_allKeys = _end_keyresp_allKeys.concat(theseKeys);
      if (_end_keyresp_allKeys.length > 0) {
        end_keyresp.keys = _end_keyresp_allKeys[_end_keyresp_allKeys.length - 1].name;  // just the last key pressed
        end_keyresp.rt = _end_keyresp_allKeys[_end_keyresp_allKeys.length - 1].rt;
        end_keyresp.duration = _end_keyresp_allKeys[_end_keyresp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    endComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function endRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'end' ---
    endComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(end_keyresp.corr, level);
    }
    psychoJS.experiment.addData('end_keyresp.keys', end_keyresp.keys);
    if (typeof end_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('end_keyresp.rt', end_keyresp.rt);
        psychoJS.experiment.addData('end_keyresp.duration', end_keyresp.duration);
        routineTimer.reset();
        }
    
    end_keyresp.stop();
    // the Routine "end" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var no_consent_screenComponents;
function no_consent_screenRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'no_consent_screen' ---
    t = 0;
    no_consent_screenClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    no_consent_screenComponents = [];
    no_consent_screenComponents.push(no_consent_txt);
    
    no_consent_screenComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function no_consent_screenRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'no_consent_screen' ---
    // get current time
    t = no_consent_screenClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *no_consent_txt* updates
    if (t >= 0.0 && no_consent_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      no_consent_txt.tStart = t;  // (not accounting for frame time here)
      no_consent_txt.frameNStart = frameN;  // exact frame index
      
      no_consent_txt.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    no_consent_screenComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function no_consent_screenRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'no_consent_screen' ---
    no_consent_screenComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "no_consent_screen" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}

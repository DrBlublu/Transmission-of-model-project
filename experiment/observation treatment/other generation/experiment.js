/******************* 
 * Experiment *
 *******************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.2.3.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


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
    return [tournament[0]["cond_filename"], tournament[0]["obs_filename"]];
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
    {'name': 'ressources/obs_instructions_1.PNG', 'path': 'ressources/obs_instructions_1.PNG'},
    {'name': 'ressources/obs_instructions_2.PNG', 'path': 'ressources/obs_instructions_2.PNG'},
    {'name': 'ressources/t_instructions_1.PNG', 'path': 'ressources/t_instructions_1.PNG'},
    {'name': 'ressources/t_instructions_2.PNG', 'path': 'ressources/t_instructions_2.PNG'},
    {'name': 'ressources/break.png', 'path': 'ressources/break.png'},
    {'name': 'ressources/t_recording.PNG', 'path': 'ressources/t_recording.PNG'},
    {'name': 'ressources/pl_global_instructions.PNG', 'path': 'ressources/pl_global_instructions.PNG'},
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
    {'name': 'ressources/cond/obs0.csv', 'path': 'ressources/cond/obs0.csv'},
    {'name': 'ressources/cond/obs1.csv', 'path': 'ressources/cond/obs1.csv'},
    {'name': 'ressources/cond/obs2.csv', 'path': 'ressources/cond/obs2.csv'},
    {'name': 'ressources/cond/obs3.csv', 'path': 'ressources/cond/obs3.csv'},
    {'name': 'ressources/cond/obs4.csv', 'path': 'ressources/cond/obs4.csv'},
    {'name': 'ressources/cond/obs5.csv', 'path': 'ressources/cond/obs5.csv'},
    {'name': 'ressources/cond/obs6.csv', 'path': 'ressources/cond/obs6.csv'},
    {'name': 'ressources/cond/obs7.csv', 'path': 'ressources/cond/obs7.csv'},
    {'name': 'ressources/cond/obs8.csv', 'path': 'ressources/cond/obs8.csv'},
    {'name': 'ressources/cond/obs9.csv', 'path': 'ressources/cond/obs9.csv'},
    {'name': 'ressources/cond/obs10.csv', 'path': 'ressources/cond/obs10.csv'},
    {'name': 'ressources/cond/obs11.csv', 'path': 'ressources/cond/obs11.csv'},
    {'name': 'ressources/cond/obs12.csv', 'path': 'ressources/cond/obs12.csv'},
    {'name': 'ressources/cond/obs13.csv', 'path': 'ressources/cond/obs13.csv'},
    {'name': 'ressources/cond/obs14.csv', 'path': 'ressources/cond/obs14.csv'},
    {'name': 'ressources/cond/obs15.csv', 'path': 'ressources/cond/obs15.csv'},
    {'name': 'ressources/cond/obs16.csv', 'path': 'ressources/cond/obs16.csv'},
    {'name': 'ressources/cond/obs17.csv', 'path': 'ressources/cond/obs17.csv'},
    {'name': 'ressources/cond/obs18.csv', 'path': 'ressources/cond/obs18.csv'},
    {'name': 'ressources/cond/obs19.csv', 'path': 'ressources/cond/obs19.csv'},
    {'name': 'ressources/cond/obs20.csv', 'path': 'ressources/cond/obs20.csv'},
    {'name': 'ressources/cond/obs21.csv', 'path': 'ressources/cond/obs21.csv'},
    {'name': 'ressources/cond/obs22.csv', 'path': 'ressources/cond/obs22.csv'},
    {'name': 'ressources/cond/obs23.csv', 'path': 'ressources/cond/obs23.csv'},
    {'name': 'ressources/cond/obs24.csv', 'path': 'ressources/cond/obs24.csv'},
    {'name': 'ressources/cond/obs25.csv', 'path': 'ressources/cond/obs25.csv'},
    {'name': 'ressources/cond/obs26.csv', 'path': 'ressources/cond/obs26.csv'},
    {'name': 'ressources/cond/obs27.csv', 'path': 'ressources/cond/obs27.csv'},
    {'name': 'ressources/cond/obs28.csv', 'path': 'ressources/cond/obs28.csv'},
    {'name': 'ressources/cond/obs29.csv', 'path': 'ressources/cond/obs29.csv'},
    {'name': 'ressources/cond/obs30.csv', 'path': 'ressources/cond/obs30.csv'},
    {'name': 'ressources/cond/obs31.csv', 'path': 'ressources/cond/obs31.csv'},
    {'name': 'ressources/cond/obs32.csv', 'path': 'ressources/cond/obs32.csv'},
    {'name': 'ressources/cond/obs33.csv', 'path': 'ressources/cond/obs33.csv'},
    {'name': 'ressources/cond/obs34.csv', 'path': 'ressources/cond/obs34.csv'},
    {'name': 'ressources/cond/obs35.csv', 'path': 'ressources/cond/obs35.csv'},
    {'name': 'ressources/cond/obs36.csv', 'path': 'ressources/cond/obs36.csv'},
    {'name': 'ressources/cond/obs37.csv', 'path': 'ressources/cond/obs37.csv'},
    {'name': 'ressources/cond/obs38.csv', 'path': 'ressources/cond/obs38.csv'},
    {'name': 'ressources/cond/obs39.csv', 'path': 'ressources/cond/obs39.csv'},
    {'name': 'ressources/cond/obs40.csv', 'path': 'ressources/cond/obs40.csv'},
    {'name': 'ressources/cond/obs41.csv', 'path': 'ressources/cond/obs41.csv'},
    {'name': 'ressources/cond/obs42.csv', 'path': 'ressources/cond/obs42.csv'},
    {'name': 'ressources/cond/obs43.csv', 'path': 'ressources/cond/obs43.csv'},
    {'name': 'ressources/cond/obs44.csv', 'path': 'ressources/cond/obs44.csv'},
    {'name': 'ressources/cond/obs45.csv', 'path': 'ressources/cond/obs45.csv'},
    {'name': 'ressources/cond/obs46.csv', 'path': 'ressources/cond/obs46.csv'},
    {'name': 'ressources/cond/obs47.csv', 'path': 'ressources/cond/obs47.csv'},
    {'name': 'ressources/cond/obs48.csv', 'path': 'ressources/cond/obs48.csv'},
    {'name': 'ressources/cond/obs49.csv', 'path': 'ressources/cond/obs49.csv'},
    {'name': 'ressources/cond/obs50.csv', 'path': 'ressources/cond/obs50.csv'},
    {'name': 'ressources/cond/obs51.csv', 'path': 'ressources/cond/obs51.csv'},
    {'name': 'ressources/cond/obs52.csv', 'path': 'ressources/cond/obs52.csv'},
    {'name': 'ressources/cond/obs53.csv', 'path': 'ressources/cond/obs53.csv'},
    {'name': 'ressources/cond/obs54.csv', 'path': 'ressources/cond/obs54.csv'},
    {'name': 'ressources/cond/obs55.csv', 'path': 'ressources/cond/obs55.csv'},
    {'name': 'ressources/cond/obs56.csv', 'path': 'ressources/cond/obs56.csv'},
    {'name': 'ressources/cond/obs57.csv', 'path': 'ressources/cond/obs57.csv'},
    {'name': 'ressources/cond/obs58.csv', 'path': 'ressources/cond/obs58.csv'},
    {'name': 'ressources/cond/obs59.csv', 'path': 'ressources/cond/obs59.csv'},
    {'name': 'ressources/cond/obs60.csv', 'path': 'ressources/cond/obs60.csv'},
    {'name': 'ressources/cond/obs61.csv', 'path': 'ressources/cond/obs61.csv'},
    {'name': 'ressources/cond/obs62.csv', 'path': 'ressources/cond/obs62.csv'},
    {'name': 'ressources/cond/obs63.csv', 'path': 'ressources/cond/obs63.csv'},
    {'name': 'ressources/cond/obs64.csv', 'path': 'ressources/cond/obs64.csv'},
    {'name': 'ressources/cond/obs65.csv', 'path': 'ressources/cond/obs65.csv'},
    {'name': 'ressources/cond/obs66.csv', 'path': 'ressources/cond/obs66.csv'},
    {'name': 'ressources/cond/obs67.csv', 'path': 'ressources/cond/obs67.csv'},
    {'name': 'ressources/cond/obs68.csv', 'path': 'ressources/cond/obs68.csv'},
    {'name': 'ressources/cond/obs69.csv', 'path': 'ressources/cond/obs69.csv'},
    {'name': 'ressources/cond/obs70.csv', 'path': 'ressources/cond/obs70.csv'},
    {'name': 'ressources/cond/obs71.csv', 'path': 'ressources/cond/obs71.csv'},
    {'name': 'ressources/cond/obs72.csv', 'path': 'ressources/cond/obs72.csv'},
    {'name': 'ressources/cond/obs73.csv', 'path': 'ressources/cond/obs73.csv'},
    {'name': 'ressources/cond/obs74.csv', 'path': 'ressources/cond/obs74.csv'},
    {'name': 'ressources/cond/obs75.csv', 'path': 'ressources/cond/obs75.csv'},
    {'name': 'ressources/cond/obs76.csv', 'path': 'ressources/cond/obs76.csv'},
    {'name': 'ressources/cond/obs77.csv', 'path': 'ressources/cond/obs77.csv'},
    {'name': 'ressources/cond/obs78.csv', 'path': 'ressources/cond/obs78.csv'},
    {'name': 'ressources/cond/obs79.csv', 'path': 'ressources/cond/obs79.csv'},
    {'name': 'ressources/cond/obs80.csv', 'path': 'ressources/cond/obs80.csv'},
    {'name': 'ressources/cond/obs81.csv', 'path': 'ressources/cond/obs81.csv'},
    {'name': 'ressources/cond/obs82.csv', 'path': 'ressources/cond/obs82.csv'},
    {'name': 'ressources/cond/obs83.csv', 'path': 'ressources/cond/obs83.csv'},
    {'name': 'ressources/cond/obs84.csv', 'path': 'ressources/cond/obs84.csv'},
    {'name': 'ressources/cond/obs85.csv', 'path': 'ressources/cond/obs85.csv'},
    {'name': 'ressources/cond/obs86.csv', 'path': 'ressources/cond/obs86.csv'},
    {'name': 'ressources/cond/obs87.csv', 'path': 'ressources/cond/obs87.csv'},
    {'name': 'ressources/cond/obs88.csv', 'path': 'ressources/cond/obs88.csv'},
    {'name': 'ressources/cond/obs89.csv', 'path': 'ressources/cond/obs89.csv'},
    {'name': 'ressources/cond/obs90.csv', 'path': 'ressources/cond/obs90.csv'},
    {'name': 'ressources/cond/obs91.csv', 'path': 'ressources/cond/obs91.csv'},
    {'name': 'ressources/cond/obs92.csv', 'path': 'ressources/cond/obs92.csv'},
    {'name': 'ressources/cond/obs93.csv', 'path': 'ressources/cond/obs93.csv'},
    {'name': 'ressources/cond/obs94.csv', 'path': 'ressources/cond/obs94.csv'},
    {'name': 'ressources/cond/obs95.csv', 'path': 'ressources/cond/obs95.csv'},
    {'name': 'ressources/cond/obs96.csv', 'path': 'ressources/cond/obs96.csv'},
    {'name': 'ressources/cond/obs97.csv', 'path': 'ressources/cond/obs97.csv'},
    {'name': 'ressources/cond/obs98.csv', 'path': 'ressources/cond/obs98.csv'},
    {'name': 'ressources/cond/obs99.csv', 'path': 'ressources/cond/obs99.csv'},
    {'name': 'ressources/cond/selection.csv', 'path': 'ressources/cond/selection.csv'},
    {'name': 'ressources/global_instruction_1.PNG', 'path': 'ressources/global_instruction_1.PNG'},
    {'name': 'ressources/break.png', 'path': 'ressources/break.png'},
    {'name': 'ressources/obs_instructions_1.PNG', 'path': 'ressources/obs_instructions_1.PNG'},
    {'name': 'ressources/obs_instructions_2.PNG', 'path': 'ressources/obs_instructions_2.PNG'},
    {'name': 'ressources/incorrect.png', 'path': 'ressources/incorrect.png'},
    {'name': 'ressources/consent.png', 'path': 'ressources/consent.png'},
    {'name': 'ressources/fail_basket.png', 'path': 'ressources/fail_basket.png'},
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
    {'name': 'ressources/mush3_deact.png', 'path': 'ressources/mush3_deact.png'},
    {'name': 'ressources/mush4.png', 'path': 'ressources/mush4.png'},
    {'name': 'ressources/mush5.png', 'path': 'ressources/mush5.png'},
    {'name': 'ressources/mush6.png', 'path': 'ressources/mush6.png'},
    {'name': 'ressources/mush7.png', 'path': 'ressources/mush7.png'},
    {'name': 'ressources/mush8.png', 'path': 'ressources/mush8.png'},
    {'name': 'ressources/mush9.png', 'path': 'ressources/mush9.png'},
    {'name': 'ressources/mush9_deact.png', 'path': 'ressources/mush9_deact.png'},
    {'name': 'ressources/obs_attention_check_step1.png', 'path': 'ressources/obs_attention_check_step1.png'},
    {'name': 'ressources/obs_attention_check_step2.png', 'path': 'ressources/obs_attention_check_step2.png'},
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
    {'name': 'ressources/stake_instructions.png', 'path': 'ressources/stake_instructions.png'},
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
    {'name': 'ressources/t_mult1_img.png', 'path': 'ressources/t_mult1_img.png'},
    {'name': 'ressources/t_mult5_img.png', 'path': 'ressources/t_mult5_img.png'},
    {'name': 'ressources/t_recording.PNG', 'path': 'ressources/t_recording.PNG'},
    {'name': 'ressources/t_tooSlow.png', 'path': 'ressources/t_tooSlow.png'},
    {'name': 'training_pairIndex.csv', 'path': 'training_pairIndex.csv'},
    {'name': 'trials_pairIndex.csv', 'path': 'trials_pairIndex.csv'},
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
var filenames;
var cond_filename;
var obs_filename;
var chainInfo;
var obsInfo;
var advice;
var global_counter;
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
var show_fail_AC_flag;
var obs_counter;
var obs_score;
var obs_n_trial;
var obs_attention_check_fail;
var attention_check_flag;
var n_attention_check;
var obs_attention_check_trial;
var obs_attention_check_trial_type;
var obs_attention_check_counter;
var obs_attention_check_step2_no_answer_flag;
var obs_attention_check_step2_mistake_flag;
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
var obs_instructions_1Clock;
var obs_instructions_1_img;
var obs_instructions_1_key;
var obs_instructions_2Clock;
var obs_instructions_2_img;
var obs_instructions_2_key;
var obs_setupClock;
var obs_fixationClock;
var obs_fixation_mandatory_txt;
var obs_stakeClock;
var obs_stake_mandatory_txt;
var obs_step1Clock;
var obs_step1_mandatory_txt;
var obs_step2Clock;
var obs_step2_mandatory_txt;
var obs_rewardClock;
var obs_reward_mandatory_txt;
var obs_attention_check_fixationClock;
var obs_attention_check_fixation_txt;
var obs_attention_check_text_txt;
var obs_attention_check_step1Clock;
var obs_attention_check_step1_mandatory_TXT;
var obs_attention_check_step1_keyresp;
var obs_attention_check_step1_mistakeClock;
var obs_attention_check_step1_mistake_txt;
var obs_attention_check_step1_no_answerClock;
var obs_attention_check_step1_no_answer_txt;
var obs_attention_check_step2Clock;
var obs_attention_check_step2_mandatory_TXT;
var obs_attention_check_step2_keyresp;
var obs_attention_check_step2_mistakeClock;
var obs_attention_check_step2_mistake_txt;
var obs_attention_check_step2_no_answerClock;
var obs_attention_check_step2_no_answer_txt;
var obs_dataClock;
var t_instructionsClock;
var t_instructions_img;
var t_instructions_keyresp;
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
var t_break_clock_text;
var t_recordingClock;
var t_recording_img;
var pl_global_instructionsClock;
var pl_global_instructions_img;
var pl_global_instructions_keyresp;
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
var fail_attention_check_screenClock;
var text;
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
  filenames = tournamentSelection(selectionInfo, k)
  cond_filename = "ressources/cond/" + filenames[0]
  obs_filename = "ressources/cond/" + filenames[1]
  // console.log(filename)
  
  chainInfo = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: cond_filename,
      seed: undefined, name: 'chainInfo'});
  
  obsInfo = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: obs_filename,
      seed: undefined, name: 'obsInfo'});
  
  
  // console.log(chainInfo.getTrialList())
  
  psychoJS.experiment.addData("parent_PID", chainInfo.trialList[0]["PROLIFIC_PID"]);
  
  advice = chainInfo.trialList[0]["msg"]
  
  // console.log(obsInfo.getTrialList().length)
  
  
  // global variable setup
  
  global_counter = 0;
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
  
  show_fail_AC_flag = 0;
  obs_counter = 0;
  obs_score = obsInfo.trialList[0]["globa_score"] - obsInfo.trialList[0]["t_points"];
  obs_n_trial = obsInfo.getTrialList().length;
  obs_attention_check_fail = 0;
  attention_check_flag = 1;
  n_attention_check = 10; // for test, value = 10 for real run
  obs_attention_check_trial = Array.from({ length: obs_n_trial}, (_, i) => i).sort(() => Math.random() - 0.5).slice(0, n_attention_check);
  //obs_attention_check_trial = Array.from({ length: n_attention_check }, () => Math.floor(Math.random() * (obs_n_trial + 1)));
  obs_attention_check_trial_type = Array(n_attention_check/2).fill("step1").concat(Array(n_attention_check/2).fill("step2"));
  shuffleArray(obs_attention_check_trial_type);
  obs_attention_check_counter = 0;
  obs_attention_check_step2_no_answer_flag = 0;
  obs_attention_check_step2_mistake_flag = 0;
  
  console.log(obs_attention_check_trial);
  
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
  
  psychoJS.experiment.addData("obs_AC_trials", obs_attention_check_trial);
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
  // Initialize components for Routine "obs_instructions_1"
  obs_instructions_1Clock = new util.Clock();
  obs_instructions_1_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'obs_instructions_1_img', units : 'norm', 
    image : 'ressources/obs_instructions_1.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  obs_instructions_1_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "obs_instructions_2"
  obs_instructions_2Clock = new util.Clock();
  obs_instructions_2_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'obs_instructions_2_img', units : 'norm', 
    image : 'ressources/obs_instructions_2.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  obs_instructions_2_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "obs_setup"
  obs_setupClock = new util.Clock();
  // Initialize components for Routine "obs_fixation"
  obs_fixationClock = new util.Clock();
  obs_fixation_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_fixation_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "obs_stake"
  obs_stakeClock = new util.Clock();
  obs_stake_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_stake_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "obs_step1"
  obs_step1Clock = new util.Clock();
  obs_step1_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_step1_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "obs_step2"
  obs_step2Clock = new util.Clock();
  obs_step2_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_step2_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "obs_reward"
  obs_rewardClock = new util.Clock();
  obs_reward_mandatory_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_reward_mandatory_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "obs_attention_check_fixation"
  obs_attention_check_fixationClock = new util.Clock();
  obs_attention_check_fixation_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_attention_check_fixation_txt',
    text: '+',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.3,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([1.0, 1.0, 1.0]),  opacity: undefined,
    depth: 0.0 
  });
  
  obs_attention_check_text_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_attention_check_text_txt',
    text: 'ATTENTION CHECK',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.3], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([1.0, 1.0, 1.0]),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "obs_attention_check_step1"
  obs_attention_check_step1Clock = new util.Clock();
  obs_attention_check_step1_mandatory_TXT = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_attention_check_step1_mandatory_TXT',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  obs_attention_check_step1_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "obs_attention_check_step1_mistake"
  obs_attention_check_step1_mistakeClock = new util.Clock();
  obs_attention_check_step1_mistake_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_attention_check_step1_mistake_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "obs_attention_check_step1_no_answer"
  obs_attention_check_step1_no_answerClock = new util.Clock();
  obs_attention_check_step1_no_answer_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_attention_check_step1_no_answer_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "obs_attention_check_step2"
  obs_attention_check_step2Clock = new util.Clock();
  obs_attention_check_step2_mandatory_TXT = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_attention_check_step2_mandatory_TXT',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  obs_attention_check_step2_keyresp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "obs_attention_check_step2_mistake"
  obs_attention_check_step2_mistakeClock = new util.Clock();
  obs_attention_check_step2_mistake_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_attention_check_step2_mistake_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "obs_attention_check_step2_no_answer"
  obs_attention_check_step2_no_answerClock = new util.Clock();
  obs_attention_check_step2_no_answer_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'obs_attention_check_step2_no_answer_txt',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "obs_data"
  obs_dataClock = new util.Clock();
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
  t_break_clock_text = new visual.TextStim({
    win: psychoJS.window,
    name: 't_break_clock_text',
    text: ' ',
    font: 'Open Sans',
    units: 'height', 
    pos: [0.7, 0.38], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([1.0, 1.0, 1.0]),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "t_recording"
  t_recordingClock = new util.Clock();
  t_recording_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 't_recording_img', units : 'norm', 
    image : 'ressources/t_recording.PNG', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [2, 2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
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
  
  // Initialize components for Routine "fail_attention_check_screen"
  fail_attention_check_screenClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: 'We are sorry to inform you that you failed the attention check.\nYou have been excluded from this experiment.\nWe ask you kindly to return your submission on the prolific website.\nIf you have any questions, feel free to reach out. Thank you.\n\nPlease press "escape" and close the tab to end the experiment.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
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
    
    for (const thisComponent of global_setupComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of global_setupComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of global_setupComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of consentComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of consentComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of consentComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    for (const thisShow_trial of show_trials) {
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
      show_trialsLoopScheduler.add(obs_instructions_1RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(obs_instructions_1RoutineEachFrame());
      show_trialsLoopScheduler.add(obs_instructions_1RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(obs_instructions_2RoutineBegin(snapshot));
      show_trialsLoopScheduler.add(obs_instructions_2RoutineEachFrame());
      show_trialsLoopScheduler.add(obs_instructions_2RoutineEnd(snapshot));
      show_trialsLoopScheduler.add(t_countdownRoutineBegin(snapshot));
      show_trialsLoopScheduler.add(t_countdownRoutineEachFrame());
      show_trialsLoopScheduler.add(t_countdownRoutineEnd(snapshot));
      const obsLoopScheduler = new Scheduler(psychoJS);
      show_trialsLoopScheduler.add(obsLoopBegin(obsLoopScheduler, snapshot));
      show_trialsLoopScheduler.add(obsLoopScheduler);
      show_trialsLoopScheduler.add(obsLoopEnd);
      const passed_attention_check_loopLoopScheduler = new Scheduler(psychoJS);
      show_trialsLoopScheduler.add(passed_attention_check_loopLoopBegin(passed_attention_check_loopLoopScheduler, snapshot));
      show_trialsLoopScheduler.add(passed_attention_check_loopLoopScheduler);
      show_trialsLoopScheduler.add(passed_attention_check_loopLoopEnd);
      const show_fail_ACLoopScheduler = new Scheduler(psychoJS);
      show_trialsLoopScheduler.add(show_fail_ACLoopBegin(show_fail_ACLoopScheduler, snapshot));
      show_trialsLoopScheduler.add(show_fail_ACLoopScheduler);
      show_trialsLoopScheduler.add(show_fail_ACLoopEnd);
      show_trialsLoopScheduler.add(show_trialsLoopEndIteration(show_trialsLoopScheduler, snapshot));
    }
    
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
    for (const thisPractice of practice) {
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
    }
    
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
    for (const thisP_step2_loop of p_step2_loop) {
      snapshot = p_step2_loop.getSnapshot();
      p_step2_loopLoopScheduler.add(importConditions(snapshot));
      p_step2_loopLoopScheduler.add(ITSRoutineBegin(snapshot));
      p_step2_loopLoopScheduler.add(ITSRoutineEachFrame());
      p_step2_loopLoopScheduler.add(ITSRoutineEnd(snapshot));
      p_step2_loopLoopScheduler.add(p_step2RoutineBegin(snapshot));
      p_step2_loopLoopScheduler.add(p_step2RoutineEachFrame());
      p_step2_loopLoopScheduler.add(p_step2RoutineEnd(snapshot));
      p_step2_loopLoopScheduler.add(p_step2_loopLoopEndIteration(p_step2_loopLoopScheduler, snapshot));
    }
    
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
    for (const thisP_reward_loop of p_reward_loop) {
      snapshot = p_reward_loop.getSnapshot();
      p_reward_loopLoopScheduler.add(importConditions(snapshot));
      p_reward_loopLoopScheduler.add(p_rewardRoutineBegin(snapshot));
      p_reward_loopLoopScheduler.add(p_rewardRoutineEachFrame());
      p_reward_loopLoopScheduler.add(p_rewardRoutineEnd(snapshot));
      p_reward_loopLoopScheduler.add(p_reward_loopLoopEndIteration(p_reward_loopLoopScheduler, snapshot));
    }
    
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
    for (const thisP_failStep1_loop of p_failStep1_loop) {
      snapshot = p_failStep1_loop.getSnapshot();
      p_failStep1_loopLoopScheduler.add(importConditions(snapshot));
      p_failStep1_loopLoopScheduler.add(p_failStep1RoutineBegin(snapshot));
      p_failStep1_loopLoopScheduler.add(p_failStep1RoutineEachFrame());
      p_failStep1_loopLoopScheduler.add(p_failStep1RoutineEnd(snapshot));
      p_failStep1_loopLoopScheduler.add(p_failStep1_loopLoopEndIteration(p_failStep1_loopLoopScheduler, snapshot));
    }
    
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
    for (const thisP_failStep2_loop of p_failStep2_loop) {
      snapshot = p_failStep2_loop.getSnapshot();
      p_failStep2_loopLoopScheduler.add(importConditions(snapshot));
      p_failStep2_loopLoopScheduler.add(p_failStep2RoutineBegin(snapshot));
      p_failStep2_loopLoopScheduler.add(p_failStep2RoutineEachFrame());
      p_failStep2_loopLoopScheduler.add(p_failStep2RoutineEnd(snapshot));
      p_failStep2_loopLoopScheduler.add(p_failStep2_loopLoopEndIteration(p_failStep2_loopLoopScheduler, snapshot));
    }
    
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


var obs;
function obsLoopBegin(obsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    obs = new TrialHandler({
      psychoJS: psychoJS,
      nReps: obs_n_trial, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'obs'
    });
    psychoJS.experiment.addLoop(obs); // add the loop to the experiment
    currentLoop = obs;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisOb of obs) {
      snapshot = obs.getSnapshot();
      obsLoopScheduler.add(importConditions(snapshot));
      obsLoopScheduler.add(obs_setupRoutineBegin(snapshot));
      obsLoopScheduler.add(obs_setupRoutineEachFrame());
      obsLoopScheduler.add(obs_setupRoutineEnd(snapshot));
      obsLoopScheduler.add(obs_fixationRoutineBegin(snapshot));
      obsLoopScheduler.add(obs_fixationRoutineEachFrame());
      obsLoopScheduler.add(obs_fixationRoutineEnd(snapshot));
      obsLoopScheduler.add(obs_stakeRoutineBegin(snapshot));
      obsLoopScheduler.add(obs_stakeRoutineEachFrame());
      obsLoopScheduler.add(obs_stakeRoutineEnd(snapshot));
      obsLoopScheduler.add(obs_step1RoutineBegin(snapshot));
      obsLoopScheduler.add(obs_step1RoutineEachFrame());
      obsLoopScheduler.add(obs_step1RoutineEnd(snapshot));
      obsLoopScheduler.add(ITSRoutineBegin(snapshot));
      obsLoopScheduler.add(ITSRoutineEachFrame());
      obsLoopScheduler.add(ITSRoutineEnd(snapshot));
      obsLoopScheduler.add(obs_step2RoutineBegin(snapshot));
      obsLoopScheduler.add(obs_step2RoutineEachFrame());
      obsLoopScheduler.add(obs_step2RoutineEnd(snapshot));
      obsLoopScheduler.add(obs_rewardRoutineBegin(snapshot));
      obsLoopScheduler.add(obs_rewardRoutineEachFrame());
      obsLoopScheduler.add(obs_rewardRoutineEnd(snapshot));
      const obs_attention_check_loopLoopScheduler = new Scheduler(psychoJS);
      obsLoopScheduler.add(obs_attention_check_loopLoopBegin(obs_attention_check_loopLoopScheduler, snapshot));
      obsLoopScheduler.add(obs_attention_check_loopLoopScheduler);
      obsLoopScheduler.add(obs_attention_check_loopLoopEnd);
      obsLoopScheduler.add(obs_dataRoutineBegin(snapshot));
      obsLoopScheduler.add(obs_dataRoutineEachFrame());
      obsLoopScheduler.add(obs_dataRoutineEnd(snapshot));
      obsLoopScheduler.add(obsLoopEndIteration(obsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var obs_attention_check_loop;
function obs_attention_check_loopLoopBegin(obs_attention_check_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    obs_attention_check_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: obs_attention_check_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'obs_attention_check_loop'
    });
    psychoJS.experiment.addLoop(obs_attention_check_loop); // add the loop to the experiment
    currentLoop = obs_attention_check_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisObs_attention_check_loop of obs_attention_check_loop) {
      snapshot = obs_attention_check_loop.getSnapshot();
      obs_attention_check_loopLoopScheduler.add(importConditions(snapshot));
      obs_attention_check_loopLoopScheduler.add(obs_attention_check_fixationRoutineBegin(snapshot));
      obs_attention_check_loopLoopScheduler.add(obs_attention_check_fixationRoutineEachFrame());
      obs_attention_check_loopLoopScheduler.add(obs_attention_check_fixationRoutineEnd(snapshot));
      const obs_attention_check_step1_loopLoopScheduler = new Scheduler(psychoJS);
      obs_attention_check_loopLoopScheduler.add(obs_attention_check_step1_loopLoopBegin(obs_attention_check_step1_loopLoopScheduler, snapshot));
      obs_attention_check_loopLoopScheduler.add(obs_attention_check_step1_loopLoopScheduler);
      obs_attention_check_loopLoopScheduler.add(obs_attention_check_step1_loopLoopEnd);
      const obs_attention_check_step2_loopLoopScheduler = new Scheduler(psychoJS);
      obs_attention_check_loopLoopScheduler.add(obs_attention_check_step2_loopLoopBegin(obs_attention_check_step2_loopLoopScheduler, snapshot));
      obs_attention_check_loopLoopScheduler.add(obs_attention_check_step2_loopLoopScheduler);
      obs_attention_check_loopLoopScheduler.add(obs_attention_check_step2_loopLoopEnd);
      obs_attention_check_loopLoopScheduler.add(t_countdownRoutineBegin(snapshot));
      obs_attention_check_loopLoopScheduler.add(t_countdownRoutineEachFrame());
      obs_attention_check_loopLoopScheduler.add(t_countdownRoutineEnd(snapshot));
      obs_attention_check_loopLoopScheduler.add(obs_attention_check_loopLoopEndIteration(obs_attention_check_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var obs_attention_check_step1_loop;
function obs_attention_check_step1_loopLoopBegin(obs_attention_check_step1_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    obs_attention_check_step1_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: obs_attention_check_step1_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'obs_attention_check_step1_loop'
    });
    psychoJS.experiment.addLoop(obs_attention_check_step1_loop); // add the loop to the experiment
    currentLoop = obs_attention_check_step1_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisObs_attention_check_step1_loop of obs_attention_check_step1_loop) {
      snapshot = obs_attention_check_step1_loop.getSnapshot();
      obs_attention_check_step1_loopLoopScheduler.add(importConditions(snapshot));
      obs_attention_check_step1_loopLoopScheduler.add(obs_attention_check_step1RoutineBegin(snapshot));
      obs_attention_check_step1_loopLoopScheduler.add(obs_attention_check_step1RoutineEachFrame());
      obs_attention_check_step1_loopLoopScheduler.add(obs_attention_check_step1RoutineEnd(snapshot));
      const obs_attention_check_mistake_step1_loopLoopScheduler = new Scheduler(psychoJS);
      obs_attention_check_step1_loopLoopScheduler.add(obs_attention_check_mistake_step1_loopLoopBegin(obs_attention_check_mistake_step1_loopLoopScheduler, snapshot));
      obs_attention_check_step1_loopLoopScheduler.add(obs_attention_check_mistake_step1_loopLoopScheduler);
      obs_attention_check_step1_loopLoopScheduler.add(obs_attention_check_mistake_step1_loopLoopEnd);
      const obs_attention_check_no_answer_step1_loopLoopScheduler = new Scheduler(psychoJS);
      obs_attention_check_step1_loopLoopScheduler.add(obs_attention_check_no_answer_step1_loopLoopBegin(obs_attention_check_no_answer_step1_loopLoopScheduler, snapshot));
      obs_attention_check_step1_loopLoopScheduler.add(obs_attention_check_no_answer_step1_loopLoopScheduler);
      obs_attention_check_step1_loopLoopScheduler.add(obs_attention_check_no_answer_step1_loopLoopEnd);
      obs_attention_check_step1_loopLoopScheduler.add(obs_attention_check_step1_loopLoopEndIteration(obs_attention_check_step1_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var obs_attention_check_mistake_step1_loop;
function obs_attention_check_mistake_step1_loopLoopBegin(obs_attention_check_mistake_step1_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    obs_attention_check_mistake_step1_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: obs_attention_check_mistake_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'obs_attention_check_mistake_step1_loop'
    });
    psychoJS.experiment.addLoop(obs_attention_check_mistake_step1_loop); // add the loop to the experiment
    currentLoop = obs_attention_check_mistake_step1_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisObs_attention_check_mistake_step1_loop of obs_attention_check_mistake_step1_loop) {
      snapshot = obs_attention_check_mistake_step1_loop.getSnapshot();
      obs_attention_check_mistake_step1_loopLoopScheduler.add(importConditions(snapshot));
      obs_attention_check_mistake_step1_loopLoopScheduler.add(obs_attention_check_step1_mistakeRoutineBegin(snapshot));
      obs_attention_check_mistake_step1_loopLoopScheduler.add(obs_attention_check_step1_mistakeRoutineEachFrame());
      obs_attention_check_mistake_step1_loopLoopScheduler.add(obs_attention_check_step1_mistakeRoutineEnd(snapshot));
      obs_attention_check_mistake_step1_loopLoopScheduler.add(obs_attention_check_mistake_step1_loopLoopEndIteration(obs_attention_check_mistake_step1_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function obs_attention_check_mistake_step1_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(obs_attention_check_mistake_step1_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function obs_attention_check_mistake_step1_loopLoopEndIteration(scheduler, snapshot) {
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


var obs_attention_check_no_answer_step1_loop;
function obs_attention_check_no_answer_step1_loopLoopBegin(obs_attention_check_no_answer_step1_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    obs_attention_check_no_answer_step1_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: obs_attention_check_no_answer_flag , method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'obs_attention_check_no_answer_step1_loop'
    });
    psychoJS.experiment.addLoop(obs_attention_check_no_answer_step1_loop); // add the loop to the experiment
    currentLoop = obs_attention_check_no_answer_step1_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisObs_attention_check_no_answer_step1_loop of obs_attention_check_no_answer_step1_loop) {
      snapshot = obs_attention_check_no_answer_step1_loop.getSnapshot();
      obs_attention_check_no_answer_step1_loopLoopScheduler.add(importConditions(snapshot));
      obs_attention_check_no_answer_step1_loopLoopScheduler.add(obs_attention_check_step1_no_answerRoutineBegin(snapshot));
      obs_attention_check_no_answer_step1_loopLoopScheduler.add(obs_attention_check_step1_no_answerRoutineEachFrame());
      obs_attention_check_no_answer_step1_loopLoopScheduler.add(obs_attention_check_step1_no_answerRoutineEnd(snapshot));
      obs_attention_check_no_answer_step1_loopLoopScheduler.add(obs_attention_check_no_answer_step1_loopLoopEndIteration(obs_attention_check_no_answer_step1_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function obs_attention_check_no_answer_step1_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(obs_attention_check_no_answer_step1_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function obs_attention_check_no_answer_step1_loopLoopEndIteration(scheduler, snapshot) {
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


async function obs_attention_check_step1_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(obs_attention_check_step1_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function obs_attention_check_step1_loopLoopEndIteration(scheduler, snapshot) {
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


var obs_attention_check_step2_loop;
function obs_attention_check_step2_loopLoopBegin(obs_attention_check_step2_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    obs_attention_check_step2_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: obs_attention_check_step2_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'obs_attention_check_step2_loop'
    });
    psychoJS.experiment.addLoop(obs_attention_check_step2_loop); // add the loop to the experiment
    currentLoop = obs_attention_check_step2_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisObs_attention_check_step2_loop of obs_attention_check_step2_loop) {
      snapshot = obs_attention_check_step2_loop.getSnapshot();
      obs_attention_check_step2_loopLoopScheduler.add(importConditions(snapshot));
      obs_attention_check_step2_loopLoopScheduler.add(obs_attention_check_step2RoutineBegin(snapshot));
      obs_attention_check_step2_loopLoopScheduler.add(obs_attention_check_step2RoutineEachFrame());
      obs_attention_check_step2_loopLoopScheduler.add(obs_attention_check_step2RoutineEnd(snapshot));
      const obs_attention_check_mistake_step2_loopLoopScheduler = new Scheduler(psychoJS);
      obs_attention_check_step2_loopLoopScheduler.add(obs_attention_check_mistake_step2_loopLoopBegin(obs_attention_check_mistake_step2_loopLoopScheduler, snapshot));
      obs_attention_check_step2_loopLoopScheduler.add(obs_attention_check_mistake_step2_loopLoopScheduler);
      obs_attention_check_step2_loopLoopScheduler.add(obs_attention_check_mistake_step2_loopLoopEnd);
      const obs_attention_check_no_answer_step2_loopLoopScheduler = new Scheduler(psychoJS);
      obs_attention_check_step2_loopLoopScheduler.add(obs_attention_check_no_answer_step2_loopLoopBegin(obs_attention_check_no_answer_step2_loopLoopScheduler, snapshot));
      obs_attention_check_step2_loopLoopScheduler.add(obs_attention_check_no_answer_step2_loopLoopScheduler);
      obs_attention_check_step2_loopLoopScheduler.add(obs_attention_check_no_answer_step2_loopLoopEnd);
      obs_attention_check_step2_loopLoopScheduler.add(obs_attention_check_step2_loopLoopEndIteration(obs_attention_check_step2_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var obs_attention_check_mistake_step2_loop;
function obs_attention_check_mistake_step2_loopLoopBegin(obs_attention_check_mistake_step2_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    obs_attention_check_mistake_step2_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: obs_attention_check_step2_mistake_flag , method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'obs_attention_check_mistake_step2_loop'
    });
    psychoJS.experiment.addLoop(obs_attention_check_mistake_step2_loop); // add the loop to the experiment
    currentLoop = obs_attention_check_mistake_step2_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisObs_attention_check_mistake_step2_loop of obs_attention_check_mistake_step2_loop) {
      snapshot = obs_attention_check_mistake_step2_loop.getSnapshot();
      obs_attention_check_mistake_step2_loopLoopScheduler.add(importConditions(snapshot));
      obs_attention_check_mistake_step2_loopLoopScheduler.add(obs_attention_check_step2_mistakeRoutineBegin(snapshot));
      obs_attention_check_mistake_step2_loopLoopScheduler.add(obs_attention_check_step2_mistakeRoutineEachFrame());
      obs_attention_check_mistake_step2_loopLoopScheduler.add(obs_attention_check_step2_mistakeRoutineEnd(snapshot));
      obs_attention_check_mistake_step2_loopLoopScheduler.add(obs_attention_check_mistake_step2_loopLoopEndIteration(obs_attention_check_mistake_step2_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function obs_attention_check_mistake_step2_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(obs_attention_check_mistake_step2_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function obs_attention_check_mistake_step2_loopLoopEndIteration(scheduler, snapshot) {
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


var obs_attention_check_no_answer_step2_loop;
function obs_attention_check_no_answer_step2_loopLoopBegin(obs_attention_check_no_answer_step2_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    obs_attention_check_no_answer_step2_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: obs_attention_check_step2_no_answer_flag , method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'obs_attention_check_no_answer_step2_loop'
    });
    psychoJS.experiment.addLoop(obs_attention_check_no_answer_step2_loop); // add the loop to the experiment
    currentLoop = obs_attention_check_no_answer_step2_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisObs_attention_check_no_answer_step2_loop of obs_attention_check_no_answer_step2_loop) {
      snapshot = obs_attention_check_no_answer_step2_loop.getSnapshot();
      obs_attention_check_no_answer_step2_loopLoopScheduler.add(importConditions(snapshot));
      obs_attention_check_no_answer_step2_loopLoopScheduler.add(obs_attention_check_step2_no_answerRoutineBegin(snapshot));
      obs_attention_check_no_answer_step2_loopLoopScheduler.add(obs_attention_check_step2_no_answerRoutineEachFrame());
      obs_attention_check_no_answer_step2_loopLoopScheduler.add(obs_attention_check_step2_no_answerRoutineEnd(snapshot));
      obs_attention_check_no_answer_step2_loopLoopScheduler.add(obs_attention_check_no_answer_step2_loopLoopEndIteration(obs_attention_check_no_answer_step2_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function obs_attention_check_no_answer_step2_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(obs_attention_check_no_answer_step2_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function obs_attention_check_no_answer_step2_loopLoopEndIteration(scheduler, snapshot) {
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


async function obs_attention_check_step2_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(obs_attention_check_step2_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function obs_attention_check_step2_loopLoopEndIteration(scheduler, snapshot) {
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


async function obs_attention_check_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(obs_attention_check_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function obs_attention_check_loopLoopEndIteration(scheduler, snapshot) {
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


async function obsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(obs);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function obsLoopEndIteration(scheduler, snapshot) {
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


var passed_attention_check_loop;
function passed_attention_check_loopLoopBegin(passed_attention_check_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    passed_attention_check_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: attention_check_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'passed_attention_check_loop'
    });
    psychoJS.experiment.addLoop(passed_attention_check_loop); // add the loop to the experiment
    currentLoop = passed_attention_check_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisPassed_attention_check_loop of passed_attention_check_loop) {
      snapshot = passed_attention_check_loop.getSnapshot();
      passed_attention_check_loopLoopScheduler.add(importConditions(snapshot));
      passed_attention_check_loopLoopScheduler.add(t_instructionsRoutineBegin(snapshot));
      passed_attention_check_loopLoopScheduler.add(t_instructionsRoutineEachFrame());
      passed_attention_check_loopLoopScheduler.add(t_instructionsRoutineEnd(snapshot));
      passed_attention_check_loopLoopScheduler.add(t_instructions_2RoutineBegin(snapshot));
      passed_attention_check_loopLoopScheduler.add(t_instructions_2RoutineEachFrame());
      passed_attention_check_loopLoopScheduler.add(t_instructions_2RoutineEnd(snapshot));
      passed_attention_check_loopLoopScheduler.add(t_countdownRoutineBegin(snapshot));
      passed_attention_check_loopLoopScheduler.add(t_countdownRoutineEachFrame());
      passed_attention_check_loopLoopScheduler.add(t_countdownRoutineEnd(snapshot));
      const trialsLoopScheduler = new Scheduler(psychoJS);
      passed_attention_check_loopLoopScheduler.add(trialsLoopBegin(trialsLoopScheduler, snapshot));
      passed_attention_check_loopLoopScheduler.add(trialsLoopScheduler);
      passed_attention_check_loopLoopScheduler.add(trialsLoopEnd);
      passed_attention_check_loopLoopScheduler.add(pl_global_instructionsRoutineBegin(snapshot));
      passed_attention_check_loopLoopScheduler.add(pl_global_instructionsRoutineEachFrame());
      passed_attention_check_loopLoopScheduler.add(pl_global_instructionsRoutineEnd(snapshot));
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_1RoutineBegin(snapshot));
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_1RoutineEachFrame());
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_1RoutineEnd(snapshot));
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_2RoutineBegin(snapshot));
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_2RoutineEachFrame());
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_2RoutineEnd(snapshot));
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_3RoutineBegin(snapshot));
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_3RoutineEachFrame());
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_3RoutineEnd(snapshot));
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_4RoutineBegin(snapshot));
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_4RoutineEachFrame());
      passed_attention_check_loopLoopScheduler.add(pl1_instructions_4RoutineEnd(snapshot));
      const pl1_loopLoopScheduler = new Scheduler(psychoJS);
      passed_attention_check_loopLoopScheduler.add(pl1_loopLoopBegin(pl1_loopLoopScheduler, snapshot));
      passed_attention_check_loopLoopScheduler.add(pl1_loopLoopScheduler);
      passed_attention_check_loopLoopScheduler.add(pl1_loopLoopEnd);
      passed_attention_check_loopLoopScheduler.add(pl2_instructionsRoutineBegin(snapshot));
      passed_attention_check_loopLoopScheduler.add(pl2_instructionsRoutineEachFrame());
      passed_attention_check_loopLoopScheduler.add(pl2_instructionsRoutineEnd(snapshot));
      const pl2_loopLoopScheduler = new Scheduler(psychoJS);
      passed_attention_check_loopLoopScheduler.add(pl2_loopLoopBegin(pl2_loopLoopScheduler, snapshot));
      passed_attention_check_loopLoopScheduler.add(pl2_loopLoopScheduler);
      passed_attention_check_loopLoopScheduler.add(pl2_loopLoopEnd);
      passed_attention_check_loopLoopScheduler.add(endRoutineBegin(snapshot));
      passed_attention_check_loopLoopScheduler.add(endRoutineEachFrame());
      passed_attention_check_loopLoopScheduler.add(endRoutineEnd(snapshot));
      passed_attention_check_loopLoopScheduler.add(passed_attention_check_loopLoopEndIteration(passed_attention_check_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
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
    for (const thisTrial of trials) {
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
      const t_recording_loopLoopScheduler = new Scheduler(psychoJS);
      trialsLoopScheduler.add(t_recording_loopLoopBegin(t_recording_loopLoopScheduler, snapshot));
      trialsLoopScheduler.add(t_recording_loopLoopScheduler);
      trialsLoopScheduler.add(t_recording_loopLoopEnd);
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    }
    
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
    for (const thisT_step2_loop of t_step2_loop) {
      snapshot = t_step2_loop.getSnapshot();
      t_step2_loopLoopScheduler.add(importConditions(snapshot));
      t_step2_loopLoopScheduler.add(ITSRoutineBegin(snapshot));
      t_step2_loopLoopScheduler.add(ITSRoutineEachFrame());
      t_step2_loopLoopScheduler.add(ITSRoutineEnd(snapshot));
      t_step2_loopLoopScheduler.add(t_step2RoutineBegin(snapshot));
      t_step2_loopLoopScheduler.add(t_step2RoutineEachFrame());
      t_step2_loopLoopScheduler.add(t_step2RoutineEnd(snapshot));
      t_step2_loopLoopScheduler.add(t_step2_loopLoopEndIteration(t_step2_loopLoopScheduler, snapshot));
    }
    
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
    for (const thisT_reward_loop of t_reward_loop) {
      snapshot = t_reward_loop.getSnapshot();
      t_reward_loopLoopScheduler.add(importConditions(snapshot));
      t_reward_loopLoopScheduler.add(t_rewardRoutineBegin(snapshot));
      t_reward_loopLoopScheduler.add(t_rewardRoutineEachFrame());
      t_reward_loopLoopScheduler.add(t_rewardRoutineEnd(snapshot));
      t_reward_loopLoopScheduler.add(t_reward_loopLoopEndIteration(t_reward_loopLoopScheduler, snapshot));
    }
    
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
    for (const thisT_failStep1_loop of t_failStep1_loop) {
      snapshot = t_failStep1_loop.getSnapshot();
      t_failStep1_loopLoopScheduler.add(importConditions(snapshot));
      t_failStep1_loopLoopScheduler.add(t_failStep1RoutineBegin(snapshot));
      t_failStep1_loopLoopScheduler.add(t_failStep1RoutineEachFrame());
      t_failStep1_loopLoopScheduler.add(t_failStep1RoutineEnd(snapshot));
      t_failStep1_loopLoopScheduler.add(t_failStep1_loopLoopEndIteration(t_failStep1_loopLoopScheduler, snapshot));
    }
    
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
    for (const thisT_failStep2_loop of t_failStep2_loop) {
      snapshot = t_failStep2_loop.getSnapshot();
      t_failStep2_loopLoopScheduler.add(importConditions(snapshot));
      t_failStep2_loopLoopScheduler.add(t_failStep2RoutineBegin(snapshot));
      t_failStep2_loopLoopScheduler.add(t_failStep2RoutineEachFrame());
      t_failStep2_loopLoopScheduler.add(t_failStep2RoutineEnd(snapshot));
      t_failStep2_loopLoopScheduler.add(t_failStep2_loopLoopEndIteration(t_failStep2_loopLoopScheduler, snapshot));
    }
    
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
    for (const thisT_break_loop of t_break_loop) {
      snapshot = t_break_loop.getSnapshot();
      t_break_loopLoopScheduler.add(importConditions(snapshot));
      t_break_loopLoopScheduler.add(t_breakRoutineBegin(snapshot));
      t_break_loopLoopScheduler.add(t_breakRoutineEachFrame());
      t_break_loopLoopScheduler.add(t_breakRoutineEnd(snapshot));
      t_break_loopLoopScheduler.add(t_countdownRoutineBegin(snapshot));
      t_break_loopLoopScheduler.add(t_countdownRoutineEachFrame());
      t_break_loopLoopScheduler.add(t_countdownRoutineEnd(snapshot));
      t_break_loopLoopScheduler.add(t_break_loopLoopEndIteration(t_break_loopLoopScheduler, snapshot));
    }
    
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


var t_recording_loop;
function t_recording_loopLoopBegin(t_recording_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    t_recording_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: t_recording_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 't_recording_loop'
    });
    psychoJS.experiment.addLoop(t_recording_loop); // add the loop to the experiment
    currentLoop = t_recording_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisT_recording_loop of t_recording_loop) {
      snapshot = t_recording_loop.getSnapshot();
      t_recording_loopLoopScheduler.add(importConditions(snapshot));
      t_recording_loopLoopScheduler.add(t_recordingRoutineBegin(snapshot));
      t_recording_loopLoopScheduler.add(t_recordingRoutineEachFrame());
      t_recording_loopLoopScheduler.add(t_recordingRoutineEnd(snapshot));
      t_recording_loopLoopScheduler.add(t_countdownRoutineBegin(snapshot));
      t_recording_loopLoopScheduler.add(t_countdownRoutineEachFrame());
      t_recording_loopLoopScheduler.add(t_countdownRoutineEnd(snapshot));
      t_recording_loopLoopScheduler.add(t_recording_loopLoopEndIteration(t_recording_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function t_recording_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(t_recording_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function t_recording_loopLoopEndIteration(scheduler, snapshot) {
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
    for (const thisPl1_loop of pl1_loop) {
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
    }
    
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
    for (const thisPl2_loop of pl2_loop) {
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
    }
    
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


async function passed_attention_check_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(passed_attention_check_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function passed_attention_check_loopLoopEndIteration(scheduler, snapshot) {
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


var show_fail_AC;
function show_fail_ACLoopBegin(show_fail_ACLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    show_fail_AC = new TrialHandler({
      psychoJS: psychoJS,
      nReps: show_fail_AC_flag, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'show_fail_AC'
    });
    psychoJS.experiment.addLoop(show_fail_AC); // add the loop to the experiment
    currentLoop = show_fail_AC;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisShow_fail_AC of show_fail_AC) {
      snapshot = show_fail_AC.getSnapshot();
      show_fail_ACLoopScheduler.add(importConditions(snapshot));
      show_fail_ACLoopScheduler.add(fail_attention_check_screenRoutineBegin(snapshot));
      show_fail_ACLoopScheduler.add(fail_attention_check_screenRoutineEachFrame());
      show_fail_ACLoopScheduler.add(fail_attention_check_screenRoutineEnd(snapshot));
      show_fail_ACLoopScheduler.add(show_fail_ACLoopEndIteration(show_fail_ACLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function show_fail_ACLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(show_fail_AC);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function show_fail_ACLoopEndIteration(scheduler, snapshot) {
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
    for (const thisShow_no_consent of show_no_consent) {
      snapshot = show_no_consent.getSnapshot();
      show_no_consentLoopScheduler.add(importConditions(snapshot));
      show_no_consentLoopScheduler.add(no_consent_screenRoutineBegin(snapshot));
      show_no_consentLoopScheduler.add(no_consent_screenRoutineEachFrame());
      show_no_consentLoopScheduler.add(no_consent_screenRoutineEnd(snapshot));
      show_no_consentLoopScheduler.add(show_no_consentLoopEndIteration(show_no_consentLoopScheduler, snapshot));
    }
    
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
    
    for (const thisComponent of global_instructions_1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of global_instructions_1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of global_instructions_1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of global_instructions_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of global_instructions_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of global_instructions_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of global_instructions_3Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of global_instructions_3Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of global_instructions_3Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of global_instructions_4Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of global_instructions_4Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of global_instructions_4Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of stake_instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of stake_instructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of stake_instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of global_instructions5Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of global_instructions5Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of global_instructions5Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of t_countdownComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_countdownComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_countdownComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of p_setupComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of p_setupComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of p_setupComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of p_fixation_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of p_fixation_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of p_fixation_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of p_stakeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of p_stakeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of p_stakeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of p_step1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of p_step1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of p_step1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of ITSComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of ITSComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of ITSComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of p_step2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of p_step2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of p_step2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of p_rewardComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of p_rewardComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of p_rewardComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of p_failStep1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of p_failStep1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of p_failStep1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of p_failStep2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of p_failStep2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of p_failStep2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of p_dataComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of p_dataComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of p_dataComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "p_data" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _obs_instructions_1_key_allKeys;
var obs_instructions_1Components;
function obs_instructions_1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_instructions_1' ---
    t = 0;
    obs_instructions_1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    obs_instructions_1_key.keys = undefined;
    obs_instructions_1_key.rt = undefined;
    _obs_instructions_1_key_allKeys = [];
    // keep track of which components have finished
    obs_instructions_1Components = [];
    obs_instructions_1Components.push(obs_instructions_1_img);
    obs_instructions_1Components.push(obs_instructions_1_key);
    
    for (const thisComponent of obs_instructions_1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_instructions_1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_instructions_1' ---
    // get current time
    t = obs_instructions_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *obs_instructions_1_img* updates
    if (t >= 0.0 && obs_instructions_1_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_instructions_1_img.tStart = t;  // (not accounting for frame time here)
      obs_instructions_1_img.frameNStart = frameN;  // exact frame index
      
      obs_instructions_1_img.setAutoDraw(true);
    }
    
    
    // *obs_instructions_1_key* updates
    if (t >= 0.0 && obs_instructions_1_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_instructions_1_key.tStart = t;  // (not accounting for frame time here)
      obs_instructions_1_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      obs_instructions_1_key.clock.reset();
      obs_instructions_1_key.start();
      obs_instructions_1_key.clearEvents();
    }
    
    if (obs_instructions_1_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = obs_instructions_1_key.getKeys({keyList: ['space'], waitRelease: false});
      _obs_instructions_1_key_allKeys = _obs_instructions_1_key_allKeys.concat(theseKeys);
      if (_obs_instructions_1_key_allKeys.length > 0) {
        obs_instructions_1_key.keys = _obs_instructions_1_key_allKeys[_obs_instructions_1_key_allKeys.length - 1].name;  // just the last key pressed
        obs_instructions_1_key.rt = _obs_instructions_1_key_allKeys[_obs_instructions_1_key_allKeys.length - 1].rt;
        obs_instructions_1_key.duration = _obs_instructions_1_key_allKeys[_obs_instructions_1_key_allKeys.length - 1].duration;
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
    for (const thisComponent of obs_instructions_1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_instructions_1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_instructions_1' ---
    for (const thisComponent of obs_instructions_1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(obs_instructions_1_key.corr, level);
    }
    psychoJS.experiment.addData('obs_instructions_1_key.keys', obs_instructions_1_key.keys);
    if (typeof obs_instructions_1_key.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('obs_instructions_1_key.rt', obs_instructions_1_key.rt);
        psychoJS.experiment.addData('obs_instructions_1_key.duration', obs_instructions_1_key.duration);
        routineTimer.reset();
        }
    
    obs_instructions_1_key.stop();
    // the Routine "obs_instructions_1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _obs_instructions_2_key_allKeys;
var obs_instructions_2Components;
function obs_instructions_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_instructions_2' ---
    t = 0;
    obs_instructions_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    obs_instructions_2_key.keys = undefined;
    obs_instructions_2_key.rt = undefined;
    _obs_instructions_2_key_allKeys = [];
    // keep track of which components have finished
    obs_instructions_2Components = [];
    obs_instructions_2Components.push(obs_instructions_2_img);
    obs_instructions_2Components.push(obs_instructions_2_key);
    
    for (const thisComponent of obs_instructions_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_instructions_2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_instructions_2' ---
    // get current time
    t = obs_instructions_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *obs_instructions_2_img* updates
    if (t >= 0.0 && obs_instructions_2_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_instructions_2_img.tStart = t;  // (not accounting for frame time here)
      obs_instructions_2_img.frameNStart = frameN;  // exact frame index
      
      obs_instructions_2_img.setAutoDraw(true);
    }
    
    
    // *obs_instructions_2_key* updates
    if (t >= 0.0 && obs_instructions_2_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_instructions_2_key.tStart = t;  // (not accounting for frame time here)
      obs_instructions_2_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      obs_instructions_2_key.clock.reset();
      obs_instructions_2_key.start();
      obs_instructions_2_key.clearEvents();
    }
    
    if (obs_instructions_2_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = obs_instructions_2_key.getKeys({keyList: ['space'], waitRelease: false});
      _obs_instructions_2_key_allKeys = _obs_instructions_2_key_allKeys.concat(theseKeys);
      if (_obs_instructions_2_key_allKeys.length > 0) {
        obs_instructions_2_key.keys = _obs_instructions_2_key_allKeys[_obs_instructions_2_key_allKeys.length - 1].name;  // just the last key pressed
        obs_instructions_2_key.rt = _obs_instructions_2_key_allKeys[_obs_instructions_2_key_allKeys.length - 1].rt;
        obs_instructions_2_key.duration = _obs_instructions_2_key_allKeys[_obs_instructions_2_key_allKeys.length - 1].duration;
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
    for (const thisComponent of obs_instructions_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_instructions_2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_instructions_2' ---
    for (const thisComponent of obs_instructions_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(obs_instructions_2_key.corr, level);
    }
    psychoJS.experiment.addData('obs_instructions_2_key.keys', obs_instructions_2_key.keys);
    if (typeof obs_instructions_2_key.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('obs_instructions_2_key.rt', obs_instructions_2_key.rt);
        psychoJS.experiment.addData('obs_instructions_2_key.duration', obs_instructions_2_key.duration);
        routineTimer.reset();
        }
    
    obs_instructions_2_key.stop();
    // the Routine "obs_instructions_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var obs_step1_deact_img;
var obs_mult;
var obs_mult_img;
var obs_step1_stimRight_file;
var obs_step1_stimLeft_file;
var obs_step1_stimRightDeact_file;
var obs_step1_stimLeftDeact_file;
var obs_step1_RT;
var obs_keyresp;
var obs_step2_forest_file;
var obs_step2_basket_file;
var obs_step2_forest_file_deact;
var obs_step2_RT;
var obs_points;
var obs_stake_img;
var obs_step1_bg_img;
var obs_step1_leftStim_img;
var obs_step1_rightStim_img;
var obs_step1_scoreBg_img;
var obs_step1_score_txt;
var obs_step1_highlight_img;
var obs_step2_bg_img;
var obs_step2_stim_img;
var obs_step2_highlight_img;
var obs_step2_scoreBg_img;
var obs_step2_score_txt;
var obs_reward_mushroom_img;
var obs_reward_trialPoints_txt;
var obs_reward_bg_img;
var obs_reward_step2Stim_img;
var obs_reward_step2Highlight_img;
var obs_reward_scoreBg_img;
var obs_reward_rewardAmount_txt;
var obs_reward_rewardAmountBg_img;
var obs_attention_check_flag;
var obs_attention_check_mistake_flag;
var obs_attention_check_no_answer_flag;
var obs_attention_check_step1_flag;
var obs_attention_check_step2_flag;
var obs_attention_check_type_flag;
var good_answer;
var obs_attention_check_step1_img;
var obs_attention_check_step2_img;
var obs_attention_check_step2_leftStim_img;
var obs_attention_check_step2_rightStim_img;
var obs_attention_check_step2_highlight_img;
var obs_attention_check_step2_right_txt;
var obs_attention_check_step2_left_txt;
var obs_attention_check_step2_right_txtBg_img;
var obs_attention_check_step2_left_txtBg_img;
var obs_AC_incorrect_img;
var obs_setupComponents;
function obs_setupRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_setup' ---
    t = 0;
    obs_setupClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from obs_setup_code
    
    obs_step1_deact_img = "ressources/mush0.jpg";
    
    // fetching data from .csv (obsInfo.trialList[obs_counter]["VARIABLE_NAME"])
    
    obs_mult = obsInfo.trialList[obs_counter]["t_mult"];
    
    obs_mult_img = (("ressources/t_mult" + obs_mult.toString() + "_img.png"));
    
    obs_step1_stimRight_file = obsInfo.trialList[obs_counter]["stimRight_filename"];
    obs_step1_stimLeft_file = obsInfo.trialList[obs_counter]["stimLeft_filename"];
    obs_step1_stimRightDeact_file = obsInfo.trialList[obs_counter]["stimRight_deact_filename"];
    obs_step1_stimLeftDeact_file = obsInfo.trialList[obs_counter]["stimLeft_deact_filename"];
    
    obs_step1_RT = obsInfo.trialList[obs_counter]["t_step1_keyresp.rt"];
    obs_keyresp = obsInfo.trialList[obs_counter]["t_step1_keyresp.keys"];
    
    obs_step2_forest_file = obsInfo.trialList[obs_counter]["forest_filename"];
    obs_step2_basket_file = obsInfo.trialList[obs_counter]["basket_filename"];
    obs_step2_forest_file_deact = ((obs_step2_forest_file.substring(0, obs_step2_forest_file.length - 4) + "_deact.png"));
    
    obs_step2_RT = obsInfo.trialList[obs_counter]["t_step2_keyresp.rt"];
    
    obs_points = obsInfo.trialList[obs_counter]["t_points"]
    
    //IMG SETUP
    
    // STEP 1
    
    obs_stake_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_stake_img', units : 'norm', 
        image : obs_mult_img, mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [0.32, 0.55],
        color : new util.Color([0, 0, 0]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -5.0 
    });
    
    obs_step1_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_step1_bg_img', units : 'norm', 
        image : 'ressources/step1_background.png', mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
    });
     
    obs_step1_leftStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_step1_leftStim_img', units : undefined, 
        image : obs_step1_stimLeft_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimLeft_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    obs_step1_rightStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_step1_rightStim_img', units : undefined, 
        image : obs_step1_stimRight_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step1_stimRight_pos, size : global_step1_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -4.0 
    });
    
    obs_step1_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_step1_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -6.0 
    });
    
    obs_step1_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'obs_step1_score_txt',
        text: "SCORE: " + obs_score.toString(), //obs score is define in the general setup
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -7.0 
    });
    
    // HIGHLIGHT
    
    obs_step1_highlight_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_step1_highlight_img', units : 'height', 
        image : 'ressources/highlight.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : undefined, size : global_highlight_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -5.0 
    });
    
    
    //STEP2 
    
    obs_step2_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_step2_bg_img', units : 'norm', 
        image : obs_step2_forest_file, mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
      });
     
    obs_step2_stim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_step2_stim_img', units : 'height', 
        image : obs_step2_basket_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_pos, size : global_step2_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    obs_step2_highlight_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_step2_highlight_img', units : undefined, 
        image : 'ressources/highlight.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_highlight_pos, size : [0.6, 0.6],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -4.0 
    });
    
    obs_step2_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_step2_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -5.0 
    });
    
    obs_step2_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'obs_step2_score_txt',
        text: 'SCORE: ' + obs_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -6.0 
    });
    
    // REWARD
    
    r_points = obs_points / obs_mult;
    obs_reward_mushroom_img = (("ressources/mush" + r_points.toString()) + ".png");
    obs_reward_trialPoints_txt = ("+" + obs_points.toString());
    
    obs_reward_bg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_reward_bg_img', units : 'norm', 
        image : obs_step2_forest_file, mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : [0, 0], size : [2, 2],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : 0.0 
    });
    
    obs_reward_step2Stim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_reward_step2Stim_img', units : 'height', 
        image : obs_step2_basket_file, mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_pos, size : global_step2_stim_size,
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -1.0 
    });
    
    obs_reward_step2Highlight_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_reward_step2Highlight_img', units : undefined, 
        image : 'ressources/highlight.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_step2_highlight_pos, size : [0.6, 0.6],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -2.0 
    });
    
    obs_reward_scoreBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_reward_scoreBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : global_scoreBg_pos, size : global_scoreBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    obs_reward_rewardAmount_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'obs_reward_rewardAmount_txt',
        text: obs_reward_trialPoints_txt,
        font: 'Open Sance',
        units: undefined, 
        pos: [0, 0.35], height: 0.25,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -4.0 
    });
    
    obs_reward_rewardAmountBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_reward_rewardAmountBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'center',
        ori : 0.0, pos : global_rewardBg_pos, size : global_rewardBg_size,
        color : new util.Color([0, 0, 0]), opacity : 0.6,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    obs_reward_mushroom_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 't_reward_mushroom_img', units : undefined, 
        image : obs_reward_mushroom_img,
        mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : [0, 0.2], size : [0.5, 0.5],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -7.0 
    });
    
    // attention check
    
    obs_attention_check_flag = 0;
    obs_attention_check_mistake_flag = 0;
    obs_attention_check_no_answer_flag = 0;
    obs_attention_check_step1_flag = 0;
    obs_attention_check_step2_flag = 0;
    obs_attention_check_step2_no_answer_flag = 0;
    obs_attention_check_step2_mistake_flag = 0;
    
    if (obs_attention_check_trial.includes(obs_counter)) {
        obs_attention_check_flag = 1;
        obs_attention_check_type_flag = obs_attention_check_trial_type[obs_attention_check_counter];
        if (obs_attention_check_type_flag === "step1"){
            obs_attention_check_step1_flag = 1;
        } else{
            obs_attention_check_step2_flag = 1;
        }
        obs_attention_check_counter = obs_attention_check_counter + 1;
    }
    
    if (obs_points <= 5){
        good_answer = "s";
    } else{
        good_answer = "k";
    }
    
    
    //console.log(obs_counter);
    
    obs_attention_check_step1_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_attention_check_step1_img', units : undefined, 
        image : 'ressources/obs_attention_check_step1.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : p_tooSlow_pos, size : p_tooSlow_size,
        color : new util.Color([0, 0, 0]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    obs_attention_check_step2_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_attention_check_step2_img', units : undefined, 
        image : 'ressources/obs_attention_check_step2.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : p_tooSlow_pos, size : p_tooSlow_size,
        color : new util.Color([0, 0, 0]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    obs_attention_check_step2_leftStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_attention_check_step2_leftStim_img', units : undefined, 
        image : "ressources/mush3.png", mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : [-.5, -.22], size : [0.4, 0.4],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    obs_attention_check_step2_rightStim_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_attention_check_step2_rightStim_img', units : undefined, 
        image : "ressources/mush9.png", mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : [.5, -.22], size : [0.4, 0.4],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -4.0 
    });
    
    obs_attention_check_step2_highlight_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_attention_check_step2_highlight_img', units : 'height', 
        image : 'ressources/highlight.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : undefined, size : [0.65, 0.65],
        color : new util.Color([1,1,1]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -5.0 
    });
    
    obs_attention_check_step2_right_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'obs_attention_check_step2_right_txt',
        text: ">5",
        font: 'Open Sans',
        units: undefined, 
        pos: [.5, -.12], height: 0.1,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -7.0 
    });
    
    obs_attention_check_step2_left_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 'obs_attention_check_step2_left_txt',
        text: "≤5",
        font: 'Open Sans',
        units: undefined, 
        pos: [-.5, -.12], height: 0.1,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -7.0 
    });
    
    obs_attention_check_step2_right_txtBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_attention_check_step2_right_txtBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : [.5, -.07], size : [0.2, 0.1],
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -6.0 
    });
    
    obs_attention_check_step2_left_txtBg_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_attention_check_step2_left_txtBg_img', units : undefined, 
        image : 'ressources/grey_rectangle.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : [-.5, -.07], size : [0.2, 0.1],
        color : new util.Color([0, 0, 0]), opacity : 0.9,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -6.0 
    });
    
    
    // WRONG
    
    obs_AC_incorrect_img = new visual.ImageStim({
        win : psychoJS.window,
        name : 'obs_AC_incorrect_img', units : undefined, 
        image : 'ressources/incorrect.png', mask : undefined,
        anchor : 'top-center',
        ori : 0.0, pos : p_tooSlow_pos, size : [1.27, 0.3],
        color : new util.Color([0, 0, 0]), opacity : undefined,
        flipHoriz : false, flipVert : false,
        texRes : 128.0, interpolate : true, depth : -3.0 
    });
    
    // keep track of which components have finished
    obs_setupComponents = [];
    
    for (const thisComponent of obs_setupComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_setupRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_setup' ---
    // get current time
    t = obs_setupClock.getTime();
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
    for (const thisComponent of obs_setupComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_setupRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_setup' ---
    for (const thisComponent of obs_setupComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "obs_setup" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var obs_fixationComponents;
function obs_fixationRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_fixation' ---
    t = 0;
    obs_fixationClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    obs_step1_bg_img.setAutoDraw(true);
    obs_step1_scoreBg_img.setAutoDraw(true);
    obs_step1_score_txt.setAutoDraw(true);
    // keep track of which components have finished
    obs_fixationComponents = [];
    obs_fixationComponents.push(obs_fixation_mandatory_txt);
    
    for (const thisComponent of obs_fixationComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_fixationRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_fixation' ---
    // get current time
    t = obs_fixationClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 0.5) {
        continueRoutine = false
    }
    
    // *obs_fixation_mandatory_txt* updates
    if (t >= 0.0 && obs_fixation_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_fixation_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      obs_fixation_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      obs_fixation_mandatory_txt.setAutoDraw(true);
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
    for (const thisComponent of obs_fixationComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_fixationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_fixation' ---
    for (const thisComponent of obs_fixationComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    obs_step1_bg_img.setAutoDraw(false);
    obs_step1_scoreBg_img.setAutoDraw(false);
    obs_step1_score_txt.setAutoDraw(false);
    // the Routine "obs_fixation" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var obs_stakeComponents;
function obs_stakeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_stake' ---
    t = 0;
    obs_stakeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    obs_stake_img.setAutoDraw(true);
    obs_step1_bg_img.setAutoDraw(true);
    obs_step1_scoreBg_img.setAutoDraw(true);
    obs_step1_score_txt.setAutoDraw(true);
    // keep track of which components have finished
    obs_stakeComponents = [];
    obs_stakeComponents.push(obs_stake_mandatory_txt);
    
    for (const thisComponent of obs_stakeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_stakeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_stake' ---
    // get current time
    t = obs_stakeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1) {
        continueRoutine = false
    }
    
    // *obs_stake_mandatory_txt* updates
    if (t >= 0.0 && obs_stake_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_stake_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      obs_stake_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      obs_stake_mandatory_txt.setAutoDraw(true);
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
    for (const thisComponent of obs_stakeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_stakeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_stake' ---
    for (const thisComponent of obs_stakeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    obs_stake_img.setAutoDraw(false);
    obs_step1_bg_img.setAutoDraw(false);
    obs_step1_scoreBg_img.setAutoDraw(false);
    obs_step1_score_txt.setAutoDraw(false);
    // the Routine "obs_stake" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var timer;
var obs_step1Components;
function obs_step1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_step1' ---
    t = 0;
    obs_step1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from obs_step1_image_code
    obs_step1_bg_img.setAutoDraw(true);
    obs_step1_leftStim_img.setAutoDraw(true);
    obs_step1_rightStim_img.setAutoDraw(true);
    obs_step1_scoreBg_img.setAutoDraw(true);
    obs_step1_score_txt.setAutoDraw(true);
    
    timer = new util.Clock();
    // keep track of which components have finished
    obs_step1Components = [];
    obs_step1Components.push(obs_step1_mandatory_txt);
    
    for (const thisComponent of obs_step1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_step1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_step1' ---
    // get current time
    t = obs_step1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1.5) {
        continueRoutine = false
    }
    if (timer.getTime() >= obs_step1_RT) {
        if ((obs_keyresp === "s")) {
            obs_step1_highlight_img.setPos([(-0.5), 0.19]);
            obs_step1_rightStim_img.setImage(obs_step1_stimRightDeact_file);
            obs_step1_rightStim_img.setAutoDraw(true);
        } else {
            obs_step1_highlight_img.setPos([(0.5), 0.19]);
            obs_step1_leftStim_img.setImage(obs_step1_stimLeftDeact_file);
            obs_step1_leftStim_img.setAutoDraw(true);
        }
        obs_step1_highlight_img.setAutoDraw(true)
    }
    
    
    // *obs_step1_mandatory_txt* updates
    if (t >= 0.0 && obs_step1_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_step1_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      obs_step1_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      obs_step1_mandatory_txt.setAutoDraw(true);
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
    for (const thisComponent of obs_step1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_step1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_step1' ---
    for (const thisComponent of obs_step1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Run 'End Routine' code from obs_step1_image_code
    obs_step1_bg_img.setAutoDraw(false);
    obs_step1_leftStim_img.setAutoDraw(false);
    obs_step1_rightStim_img.setAutoDraw(false);
    obs_step1_highlight_img.setAutoDraw(false);
    obs_step1_scoreBg_img.setAutoDraw(false);
    obs_step1_score_txt.setAutoDraw(false);
    
    // reset image for attention check
    obs_step1_rightStim_img.setImage(obs_step1_stimRight_file);
    obs_step1_leftStim_img.setImage(obs_step1_stimLeft_file);
    // the Routine "obs_step1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var obs_step2Components;
function obs_step2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_step2' ---
    t = 0;
    obs_step2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from obs_step2_image_code
    obs_step2_bg_img.setAutoDraw(true);
    obs_step2_stim_img.setAutoDraw(true);
    obs_step2_scoreBg_img.setAutoDraw(true);
    obs_step2_score_txt.setAutoDraw(true);
    
    timer = new util.Clock();
    // keep track of which components have finished
    obs_step2Components = [];
    obs_step2Components.push(obs_step2_mandatory_txt);
    
    for (const thisComponent of obs_step2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_step2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_step2' ---
    // get current time
    t = obs_step2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1.5) {
        continueRoutine = false
    }
    if (timer.getTime() >= obs_step2_RT) {
        obs_step2_highlight_img.setAutoDraw(true)
    }
    
    // *obs_step2_mandatory_txt* updates
    if (t >= 0.0 && obs_step2_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_step2_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      obs_step2_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      obs_step2_mandatory_txt.setAutoDraw(true);
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
    for (const thisComponent of obs_step2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var obs_reward_score_txt;
function obs_step2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_step2' ---
    for (const thisComponent of obs_step2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Run 'End Routine' code from obs_step2_code
    obs_score = (obs_score + obs_points);
    
    obs_reward_score_txt = new visual.TextStim({
        win: psychoJS.window,
        name: 't_reward_score_txt',
        text: "SCORE: " + obs_score.toString(),
        font: 'Open Sans',
        units: undefined, 
        pos: global_score_pos, height: global_score_size,  wrapWidth: undefined, ori: 0.0,
        languageStyle: 'LTR',
        color: new util.Color('white'),  opacity: undefined,
        depth: -6.0 
    });
    // Run 'End Routine' code from obs_step2_image_code
    obs_step2_bg_img.setAutoDraw(false);
    obs_step2_stim_img.setAutoDraw(false);
    obs_step2_highlight_img.setAutoDraw(false);
    obs_step2_scoreBg_img.setAutoDraw(false);
    obs_step2_score_txt.setAutoDraw(false);
    
    // the Routine "obs_step2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var obs_rewardComponents;
function obs_rewardRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_reward' ---
    t = 0;
    obs_rewardClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    obs_reward_bg_img.setAutoDraw(true);
    obs_reward_step2Stim_img.setAutoDraw(true);
    obs_reward_step2Highlight_img.setAutoDraw(true);
    obs_reward_scoreBg_img.setAutoDraw(true);
    obs_reward_rewardAmountBg_img.setAutoDraw(true);
    obs_reward_rewardAmount_txt.setAutoDraw(true);
    obs_reward_score_txt.setAutoDraw(true);
    obs_reward_mushroom_img.setAutoDraw(true);
    
    // keep track of which components have finished
    obs_rewardComponents = [];
    obs_rewardComponents.push(obs_reward_mandatory_txt);
    
    for (const thisComponent of obs_rewardComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_rewardRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_reward' ---
    // get current time
    t = obs_rewardClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 2) {
        continueRoutine = false
    }
    
    // *obs_reward_mandatory_txt* updates
    if (t >= 0.0 && obs_reward_mandatory_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_reward_mandatory_txt.tStart = t;  // (not accounting for frame time here)
      obs_reward_mandatory_txt.frameNStart = frameN;  // exact frame index
      
      obs_reward_mandatory_txt.setAutoDraw(true);
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
    for (const thisComponent of obs_rewardComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_rewardRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_reward' ---
    for (const thisComponent of obs_rewardComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    obs_reward_bg_img.setAutoDraw(false);
    obs_reward_step2Stim_img.setAutoDraw(false);
    obs_reward_step2Highlight_img.setAutoDraw(false);
    obs_reward_scoreBg_img.setAutoDraw(false);
    obs_reward_rewardAmountBg_img.setAutoDraw(false);
    obs_reward_rewardAmount_txt.setAutoDraw(false);
    obs_reward_score_txt.setAutoDraw(false);
    obs_reward_mushroom_img.setAutoDraw(false);
    
    obs_counter = obs_counter + 1;
    // the Routine "obs_reward" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var obs_attention_check_fixationComponents;
function obs_attention_check_fixationRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_attention_check_fixation' ---
    t = 0;
    obs_attention_check_fixationClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    obs_attention_check_fixationComponents = [];
    obs_attention_check_fixationComponents.push(obs_attention_check_fixation_txt);
    obs_attention_check_fixationComponents.push(obs_attention_check_text_txt);
    
    for (const thisComponent of obs_attention_check_fixationComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_attention_check_fixationRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_attention_check_fixation' ---
    // get current time
    t = obs_attention_check_fixationClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 1) {
        continueRoutine = false
    }
    
    // *obs_attention_check_fixation_txt* updates
    if (t >= 0.0 && obs_attention_check_fixation_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_attention_check_fixation_txt.tStart = t;  // (not accounting for frame time here)
      obs_attention_check_fixation_txt.frameNStart = frameN;  // exact frame index
      
      obs_attention_check_fixation_txt.setAutoDraw(true);
    }
    
    
    // *obs_attention_check_text_txt* updates
    if (t >= 0.0 && obs_attention_check_text_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_attention_check_text_txt.tStart = t;  // (not accounting for frame time here)
      obs_attention_check_text_txt.frameNStart = frameN;  // exact frame index
      
      obs_attention_check_text_txt.setAutoDraw(true);
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
    for (const thisComponent of obs_attention_check_fixationComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_attention_check_fixationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_attention_check_fixation' ---
    for (const thisComponent of obs_attention_check_fixationComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "obs_attention_check_fixation" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _obs_attention_check_step1_keyresp_allKeys;
var obs_attention_check_step1Components;
function obs_attention_check_step1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_attention_check_step1' ---
    t = 0;
    obs_attention_check_step1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    obs_step1_bg_img.setAutoDraw(true);
    obs_step1_leftStim_img.setAutoDraw(true);
    obs_step1_rightStim_img.setAutoDraw(true);
    obs_attention_check_step1_img.setAutoDraw(true);
    
    obs_attention_check_step1_keyresp.keys = undefined;
    obs_attention_check_step1_keyresp.rt = undefined;
    _obs_attention_check_step1_keyresp_allKeys = [];
    // keep track of which components have finished
    obs_attention_check_step1Components = [];
    obs_attention_check_step1Components.push(obs_attention_check_step1_mandatory_TXT);
    obs_attention_check_step1Components.push(obs_attention_check_step1_keyresp);
    
    for (const thisComponent of obs_attention_check_step1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_attention_check_step1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_attention_check_step1' ---
    // get current time
    t = obs_attention_check_step1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 5) {
        continueRoutine = false
    }
    if (_obs_attention_check_step1_keyresp_allKeys.length > 0) {
        if ((obs_attention_check_step1_keyresp.keys === "s")) {
            obs_step1_highlight_img.setPos([(-0.5), 0.19]);
            obs_step1_rightStim_img.setImage(obs_step1_stimRightDeact_file);
            obs_step1_highlight_img.setAutoDraw(true);
            obs_step1_rightStim_img.setAutoDraw(true);
        } else {
            obs_step1_highlight_img.setPos([0.5, 0.19]);
            obs_step1_leftStim_img.setImage(obs_step1_stimLeftDeact_file);
            obs_step1_highlight_img.setAutoDraw(true);
            obs_step1_leftStim_img.setAutoDraw(true);
        }
    }
    
    
    // *obs_attention_check_step1_mandatory_TXT* updates
    if (t >= 0.0 && obs_attention_check_step1_mandatory_TXT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_attention_check_step1_mandatory_TXT.tStart = t;  // (not accounting for frame time here)
      obs_attention_check_step1_mandatory_TXT.frameNStart = frameN;  // exact frame index
      
      obs_attention_check_step1_mandatory_TXT.setAutoDraw(true);
    }
    
    
    // *obs_attention_check_step1_keyresp* updates
    if (t >= 0 && obs_attention_check_step1_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_attention_check_step1_keyresp.tStart = t;  // (not accounting for frame time here)
      obs_attention_check_step1_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      obs_attention_check_step1_keyresp.clock.reset();
      obs_attention_check_step1_keyresp.start();
      obs_attention_check_step1_keyresp.clearEvents();
    }
    
    frameRemains = 0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (obs_attention_check_step1_keyresp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      obs_attention_check_step1_keyresp.status = PsychoJS.Status.FINISHED;
        }
      
    if (obs_attention_check_step1_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = obs_attention_check_step1_keyresp.getKeys({keyList: ['s', 'k'], waitRelease: false});
      _obs_attention_check_step1_keyresp_allKeys = _obs_attention_check_step1_keyresp_allKeys.concat(theseKeys);
      if (_obs_attention_check_step1_keyresp_allKeys.length > 0) {
        obs_attention_check_step1_keyresp.keys = _obs_attention_check_step1_keyresp_allKeys[0].name;  // just the first key pressed
        obs_attention_check_step1_keyresp.rt = _obs_attention_check_step1_keyresp_allKeys[0].rt;
        obs_attention_check_step1_keyresp.duration = _obs_attention_check_step1_keyresp_allKeys[0].duration;
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
    for (const thisComponent of obs_attention_check_step1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_attention_check_step1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_attention_check_step1' ---
    for (const thisComponent of obs_attention_check_step1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    obs_step1_bg_img.setAutoDraw(false);
    obs_step1_leftStim_img.setAutoDraw(false);
    obs_step1_rightStim_img.setAutoDraw(false);
    obs_step1_highlight_img.setAutoDraw(false);
    obs_attention_check_step1_img.setAutoDraw(false);
    
    if (_obs_attention_check_step1_keyresp_allKeys.length > 0) {
        if (obs_attention_check_step1_keyresp.keys !== obs_keyresp){
            obs_attention_check_fail = obs_attention_check_fail + 1;
            obs_attention_check_mistake_flag = 1;
            obs_step1_bg_img.setImage("ressources/step1_background_deact.png");
            if (obs_attention_check_step1_keyresp.keys === "s"){ // if answer was k (right)
                obs_step1_rightStim_img.setImage(obs_step1_stimRight_file);
                obs_step1_leftStim_img.setImage(obs_step1_stimLeftDeact_file);
            } else{
                obs_step1_rightStim_img.setImage(obs_step1_stimRightDeact_file);
                obs_step1_leftStim_img.setImage(obs_step1_stimLeft_file);
            }
        }
    } else{
        obs_attention_check_fail = obs_attention_check_fail + 1;
        obs_attention_check_no_answer_flag = 1;
        obs_step1_bg_img.setImage("ressources/step1_background_deact.png");
        obs_step1_leftStim_img.setImage(obs_step1_stimLeftDeact_file);
        obs_step1_rightStim_img.setImage(obs_step1_stimRightDeact_file);
    }
    
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(obs_attention_check_step1_keyresp.corr, level);
    }
    psychoJS.experiment.addData('obs_attention_check_step1_keyresp.keys', obs_attention_check_step1_keyresp.keys);
    if (typeof obs_attention_check_step1_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('obs_attention_check_step1_keyresp.rt', obs_attention_check_step1_keyresp.rt);
        psychoJS.experiment.addData('obs_attention_check_step1_keyresp.duration', obs_attention_check_step1_keyresp.duration);
        }
    
    obs_attention_check_step1_keyresp.stop();
    // the Routine "obs_attention_check_step1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var obs_attention_check_step1_mistakeComponents;
function obs_attention_check_step1_mistakeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_attention_check_step1_mistake' ---
    t = 0;
    obs_attention_check_step1_mistakeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    obs_step1_bg_img.setAutoDraw(true);
    obs_step1_leftStim_img.setAutoDraw(true);
    obs_step1_rightStim_img.setAutoDraw(true);
    obs_step1_highlight_img.setAutoDraw(true);
    obs_AC_incorrect_img.setAutoDraw(true);
    // keep track of which components have finished
    obs_attention_check_step1_mistakeComponents = [];
    obs_attention_check_step1_mistakeComponents.push(obs_attention_check_step1_mistake_txt);
    
    for (const thisComponent of obs_attention_check_step1_mistakeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_attention_check_step1_mistakeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_attention_check_step1_mistake' ---
    // get current time
    t = obs_attention_check_step1_mistakeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 5) {
        continueRoutine = false
    }
    
    // *obs_attention_check_step1_mistake_txt* updates
    if (t >= 0.0 && obs_attention_check_step1_mistake_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_attention_check_step1_mistake_txt.tStart = t;  // (not accounting for frame time here)
      obs_attention_check_step1_mistake_txt.frameNStart = frameN;  // exact frame index
      
      obs_attention_check_step1_mistake_txt.setAutoDraw(true);
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
    for (const thisComponent of obs_attention_check_step1_mistakeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_attention_check_step1_mistakeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_attention_check_step1_mistake' ---
    for (const thisComponent of obs_attention_check_step1_mistakeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    obs_step1_bg_img.setAutoDraw(false);
    obs_step1_leftStim_img.setAutoDraw(false);
    obs_step1_rightStim_img.setAutoDraw(false);
    obs_step1_highlight_img.setAutoDraw(false);
    obs_AC_incorrect_img.setAutoDraw(false);
    // the Routine "obs_attention_check_step1_mistake" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var obs_attention_check_step1_no_answerComponents;
function obs_attention_check_step1_no_answerRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_attention_check_step1_no_answer' ---
    t = 0;
    obs_attention_check_step1_no_answerClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    obs_step1_bg_img.setAutoDraw(true);
    obs_step1_leftStim_img.setAutoDraw(true);
    obs_step1_rightStim_img.setAutoDraw(true);
    obs_AC_incorrect_img.setAutoDraw(true);
    // keep track of which components have finished
    obs_attention_check_step1_no_answerComponents = [];
    obs_attention_check_step1_no_answerComponents.push(obs_attention_check_step1_no_answer_txt);
    
    for (const thisComponent of obs_attention_check_step1_no_answerComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_attention_check_step1_no_answerRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_attention_check_step1_no_answer' ---
    // get current time
    t = obs_attention_check_step1_no_answerClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 2) {
        continueRoutine = false
    }
    
    // *obs_attention_check_step1_no_answer_txt* updates
    if (t >= 0.0 && obs_attention_check_step1_no_answer_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_attention_check_step1_no_answer_txt.tStart = t;  // (not accounting for frame time here)
      obs_attention_check_step1_no_answer_txt.frameNStart = frameN;  // exact frame index
      
      obs_attention_check_step1_no_answer_txt.setAutoDraw(true);
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
    for (const thisComponent of obs_attention_check_step1_no_answerComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_attention_check_step1_no_answerRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_attention_check_step1_no_answer' ---
    for (const thisComponent of obs_attention_check_step1_no_answerComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    obs_step1_bg_img.setAutoDraw(false);
    obs_step1_leftStim_img.setAutoDraw(false);
    obs_step1_rightStim_img.setAutoDraw(false);
    obs_AC_incorrect_img.setAutoDraw(false);
    // the Routine "obs_attention_check_step1_no_answer" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _obs_attention_check_step2_keyresp_allKeys;
var obs_attention_check_step2Components;
function obs_attention_check_step2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_attention_check_step2' ---
    t = 0;
    obs_attention_check_step2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    obs_attention_check_step2_img.setAutoDraw(true);
    obs_step2_bg_img.setAutoDraw(true);
    obs_attention_check_step2_leftStim_img.setAutoDraw(true);
    obs_attention_check_step2_rightStim_img.setAutoDraw(true);
    obs_attention_check_step2_left_txt.setAutoDraw(true);
    obs_attention_check_step2_right_txt.setAutoDraw(true);
    obs_attention_check_step2_left_txtBg_img.setAutoDraw(true);
    obs_attention_check_step2_right_txtBg_img.setAutoDraw(true);
    
    
    obs_attention_check_step2_keyresp.keys = undefined;
    obs_attention_check_step2_keyresp.rt = undefined;
    _obs_attention_check_step2_keyresp_allKeys = [];
    // keep track of which components have finished
    obs_attention_check_step2Components = [];
    obs_attention_check_step2Components.push(obs_attention_check_step2_mandatory_TXT);
    obs_attention_check_step2Components.push(obs_attention_check_step2_keyresp);
    
    for (const thisComponent of obs_attention_check_step2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_attention_check_step2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_attention_check_step2' ---
    // get current time
    t = obs_attention_check_step2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 5) {
        continueRoutine = false
    }
    if (_obs_attention_check_step2_keyresp_allKeys.length > 0) {
        if ((obs_attention_check_step2_keyresp.keys === "s")) {
            obs_attention_check_step2_highlight_img.setPos([(-0.5), 0.1]);
            obs_attention_check_step2_rightStim_img.setImage("ressources/mush9_deact.png");
            obs_attention_check_step2_highlight_img.setAutoDraw(true);
            obs_attention_check_step2_rightStim_img.setAutoDraw(true);
        } else {
            obs_attention_check_step2_highlight_img.setPos([0.5, 0.1]);
            obs_attention_check_step2_leftStim_img.setImage("ressources/mush3_deact.png");
            obs_attention_check_step2_highlight_img.setAutoDraw(true);
            obs_attention_check_step2_leftStim_img.setAutoDraw(true);
        }
    }
    
    
    // *obs_attention_check_step2_mandatory_TXT* updates
    if (t >= 0.0 && obs_attention_check_step2_mandatory_TXT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_attention_check_step2_mandatory_TXT.tStart = t;  // (not accounting for frame time here)
      obs_attention_check_step2_mandatory_TXT.frameNStart = frameN;  // exact frame index
      
      obs_attention_check_step2_mandatory_TXT.setAutoDraw(true);
    }
    
    
    // *obs_attention_check_step2_keyresp* updates
    if (t >= 0 && obs_attention_check_step2_keyresp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_attention_check_step2_keyresp.tStart = t;  // (not accounting for frame time here)
      obs_attention_check_step2_keyresp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      obs_attention_check_step2_keyresp.clock.reset();
      obs_attention_check_step2_keyresp.start();
      obs_attention_check_step2_keyresp.clearEvents();
    }
    
    frameRemains = 0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (obs_attention_check_step2_keyresp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      obs_attention_check_step2_keyresp.status = PsychoJS.Status.FINISHED;
        }
      
    if (obs_attention_check_step2_keyresp.status === PsychoJS.Status.STARTED) {
      let theseKeys = obs_attention_check_step2_keyresp.getKeys({keyList: ['s', 'k'], waitRelease: false});
      _obs_attention_check_step2_keyresp_allKeys = _obs_attention_check_step2_keyresp_allKeys.concat(theseKeys);
      if (_obs_attention_check_step2_keyresp_allKeys.length > 0) {
        obs_attention_check_step2_keyresp.keys = _obs_attention_check_step2_keyresp_allKeys[0].name;  // just the first key pressed
        obs_attention_check_step2_keyresp.rt = _obs_attention_check_step2_keyresp_allKeys[0].rt;
        obs_attention_check_step2_keyresp.duration = _obs_attention_check_step2_keyresp_allKeys[0].duration;
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
    for (const thisComponent of obs_attention_check_step2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_attention_check_step2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_attention_check_step2' ---
    for (const thisComponent of obs_attention_check_step2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    obs_attention_check_step2_img.setAutoDraw(false);
    obs_step2_bg_img.setAutoDraw(false);
    obs_attention_check_step2_leftStim_img.setAutoDraw(false);
    obs_attention_check_step2_rightStim_img.setAutoDraw(false);
    obs_attention_check_step2_highlight_img.setAutoDraw(false);
    obs_attention_check_step2_left_txt.setAutoDraw(false);
    obs_attention_check_step2_right_txt.setAutoDraw(false);
    obs_attention_check_step2_left_txtBg_img.setAutoDraw(false);
    obs_attention_check_step2_right_txtBg_img.setAutoDraw(false);
    
    if (_obs_attention_check_step2_keyresp_allKeys.length > 0) {
        if (obs_attention_check_step2_keyresp.keys !== good_answer){
            obs_attention_check_fail = obs_attention_check_fail + 1;
            obs_attention_check_step2_mistake_flag = 1;
            obs_step2_bg_img.setImage(obs_step2_forest_file_deact);
            if (obs_attention_check_step2_keyresp.keys === "s"){ // if answer was k (right)
                obs_attention_check_step2_rightStim_img.setImage("ressources/mush9.png");
                obs_attention_check_step2_leftStim_img.setImage("ressources/mush3_deact.png");
            } else{
                obs_attention_check_step2_rightStim_img.setImage("ressources/mush9_deact.png")
                obs_attention_check_step2_leftStim_img.setImage("ressources/mush3.png");
            }
        }
    } else{
        obs_attention_check_fail = obs_attention_check_fail + 1;
        obs_attention_check_step2_no_answer_flag = 1;
        obs_step2_bg_img.setImage(obs_step2_forest_file_deact);
        obs_attention_check_step2_leftStim_img.setImage("ressources/mush3_deact.png");
        obs_attention_check_step2_rightStim_img.setImage("ressources/mush9_deact.png");
    }
    
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(obs_attention_check_step2_keyresp.corr, level);
    }
    psychoJS.experiment.addData('obs_attention_check_step2_keyresp.keys', obs_attention_check_step2_keyresp.keys);
    if (typeof obs_attention_check_step2_keyresp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('obs_attention_check_step2_keyresp.rt', obs_attention_check_step2_keyresp.rt);
        psychoJS.experiment.addData('obs_attention_check_step2_keyresp.duration', obs_attention_check_step2_keyresp.duration);
        }
    
    obs_attention_check_step2_keyresp.stop();
    // the Routine "obs_attention_check_step2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var obs_attention_check_step2_mistakeComponents;
function obs_attention_check_step2_mistakeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_attention_check_step2_mistake' ---
    t = 0;
    obs_attention_check_step2_mistakeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    obs_step2_bg_img.setAutoDraw(true);
    obs_attention_check_step2_leftStim_img.setAutoDraw(true);
    obs_attention_check_step2_rightStim_img.setAutoDraw(true);
    obs_attention_check_step2_left_txt.setAutoDraw(true);
    obs_attention_check_step2_right_txt.setAutoDraw(true);
    obs_attention_check_step2_left_txtBg_img.setAutoDraw(true);
    obs_attention_check_step2_right_txtBg_img.setAutoDraw(true);
    obs_attention_check_step2_highlight_img.setAutoDraw(true);
    obs_AC_incorrect_img.setAutoDraw(true);
    // keep track of which components have finished
    obs_attention_check_step2_mistakeComponents = [];
    obs_attention_check_step2_mistakeComponents.push(obs_attention_check_step2_mistake_txt);
    
    for (const thisComponent of obs_attention_check_step2_mistakeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_attention_check_step2_mistakeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_attention_check_step2_mistake' ---
    // get current time
    t = obs_attention_check_step2_mistakeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 2) {
        continueRoutine = false
    }
    
    // *obs_attention_check_step2_mistake_txt* updates
    if (t >= 0.0 && obs_attention_check_step2_mistake_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_attention_check_step2_mistake_txt.tStart = t;  // (not accounting for frame time here)
      obs_attention_check_step2_mistake_txt.frameNStart = frameN;  // exact frame index
      
      obs_attention_check_step2_mistake_txt.setAutoDraw(true);
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
    for (const thisComponent of obs_attention_check_step2_mistakeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_attention_check_step2_mistakeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_attention_check_step2_mistake' ---
    for (const thisComponent of obs_attention_check_step2_mistakeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    obs_step2_bg_img.setAutoDraw(false);
    obs_attention_check_step2_leftStim_img.setAutoDraw(false);
    obs_attention_check_step2_rightStim_img.setAutoDraw(false);
    obs_attention_check_step2_left_txt.setAutoDraw(false);
    obs_attention_check_step2_right_txt.setAutoDraw(false);
    obs_attention_check_step2_left_txtBg_img.setAutoDraw(false);
    obs_attention_check_step2_right_txtBg_img.setAutoDraw(false);
    obs_attention_check_step2_highlight_img.setAutoDraw(false);
    obs_AC_incorrect_img.setAutoDraw(false);
    // the Routine "obs_attention_check_step2_mistake" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var obs_attention_check_step2_no_answerComponents;
function obs_attention_check_step2_no_answerRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_attention_check_step2_no_answer' ---
    t = 0;
    obs_attention_check_step2_no_answerClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    obs_step2_bg_img.setAutoDraw(true);
    obs_attention_check_step2_leftStim_img.setAutoDraw(true);
    obs_attention_check_step2_rightStim_img.setAutoDraw(true);
    obs_attention_check_step2_left_txt.setAutoDraw(true);
    obs_attention_check_step2_right_txt.setAutoDraw(true);
    obs_attention_check_step2_left_txtBg_img.setAutoDraw(true);
    obs_attention_check_step2_right_txtBg_img.setAutoDraw(true);
    obs_AC_incorrect_img.setAutoDraw(true);
    // keep track of which components have finished
    obs_attention_check_step2_no_answerComponents = [];
    obs_attention_check_step2_no_answerComponents.push(obs_attention_check_step2_no_answer_txt);
    
    for (const thisComponent of obs_attention_check_step2_no_answerComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_attention_check_step2_no_answerRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_attention_check_step2_no_answer' ---
    // get current time
    t = obs_attention_check_step2_no_answerClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 2) {
        continueRoutine = false
    }
    
    // *obs_attention_check_step2_no_answer_txt* updates
    if (t >= 0.0 && obs_attention_check_step2_no_answer_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      obs_attention_check_step2_no_answer_txt.tStart = t;  // (not accounting for frame time here)
      obs_attention_check_step2_no_answer_txt.frameNStart = frameN;  // exact frame index
      
      obs_attention_check_step2_no_answer_txt.setAutoDraw(true);
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
    for (const thisComponent of obs_attention_check_step2_no_answerComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_attention_check_step2_no_answerRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_attention_check_step2_no_answer' ---
    for (const thisComponent of obs_attention_check_step2_no_answerComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    obs_step2_bg_img.setAutoDraw(false);
    obs_attention_check_step2_leftStim_img.setAutoDraw(false);
    obs_attention_check_step2_rightStim_img.setAutoDraw(false);
    obs_attention_check_step2_highlight_img.setAutoDraw(false);
    obs_attention_check_step2_left_txt.setAutoDraw(false);
    obs_attention_check_step2_right_txt.setAutoDraw(false);
    obs_attention_check_step2_left_txtBg_img.setAutoDraw(false);
    obs_attention_check_step2_right_txtBg_img.setAutoDraw(false);
    obs_AC_incorrect_img.setAutoDraw(false);
    // the Routine "obs_attention_check_step2_no_answer" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var obs_dataComponents;
function obs_dataRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'obs_data' ---
    t = 0;
    obs_dataClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if (obs_attention_check_fail > 5) {
        obs.finished = true;
        attention_check_flag = 0;
        show_fail_AC_flag = 1;
    }
    // keep track of which components have finished
    obs_dataComponents = [];
    
    for (const thisComponent of obs_dataComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function obs_dataRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'obs_data' ---
    // get current time
    t = obs_dataClock.getTime();
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
    for (const thisComponent of obs_dataComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function obs_dataRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'obs_data' ---
    for (const thisComponent of obs_dataComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData("obs_stim_left", obs_step1_stimLeft_file);
    psychoJS.experiment.addData("obs_stim_right", obs_step1_stimRight_file);
    psychoJS.experiment.addData("obs_step1_key", obs_keyresp);
    psychoJS.experiment.addData("obs_step1_RT", obs_step1_RT);
    psychoJS.experiment.addData("obs_step2_forest", obs_step2_forest_file);
    psychoJS.experiment.addData("obs_step2_basket", obs_step2_basket_file);
    psychoJS.experiment.addData("obs_step2_RT", obs_step2_RT);
    psychoJS.experiment.addData("obs_mult", obs_mult);
    psychoJS.experiment.addData("obs_points", obs_points);
    psychoJS.experiment.addData("obs_score", obs_score);
    psychoJS.experiment.addData("obs_AC_flag", obs_attention_check_flag);
    psychoJS.experiment.addData("obs_AC_step1_flag", obs_attention_check_step1_flag);
    psychoJS.experiment.addData("obs_AC_step2_flag", obs_attention_check_step2_flag);
    psychoJS.experiment.addData("obs_AC_mistake_flag", obs_attention_check_mistake_flag);
    psychoJS.experiment.addData("obs_AC_no_answer_flag", obs_attention_check_no_answer_flag);
    psychoJS.experiment.addData("obs_AC_step2_no_answer_flag", obs_attention_check_step2_mistake_flag);
    psychoJS.experiment.addData("obs_AC_step2_no_answer_flag", obs_attention_check_step2_no_answer_flag);
    
    psychoJS.experiment.addData("obs_AC_counter", obs_attention_check_counter);
    psychoJS.experiment.addData("good_answer", good_answer);
    psychoJS.experiment.addData("obs_attention_check_fail", obs_attention_check_fail);
    // the Routine "obs_data" was not non-slip safe, so reset the non-slip timer
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
    
    for (const thisComponent of t_instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_instructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of t_instructions_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_instructions_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_instructions_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
var t_recording_flag;
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
    
    // recording
    
    t_recording_flag = 0;
    if (global_counter === 176){
        t_recording_flag = 1;
    }
    
    global_counter = global_counter + 1;
    
    
    // keep track of which components have finished
    t_setupComponents = [];
    
    for (const thisComponent of t_setupComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_setupComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_setupComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of t_fixationComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_fixationComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_fixationComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of t_stakeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_stakeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_stakeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of t_step1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_step1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_step1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of t_step2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_step2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_step2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of t_rewardComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_rewardComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_rewardComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of t_failStep1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_failStep1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_failStep1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of t_failStep2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_failStep2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_failStep2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of t_dataComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_dataComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_dataComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    t_breakComponents.push(t_break_clock_text);
    
    for (const thisComponent of t_breakComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of t_breakComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of t_breakComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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


var t_recordingComponents;
function t_recordingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 't_recording' ---
    t = 0;
    t_recordingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('t_recording.started', globalClock.getTime());
    // keep track of which components have finished
    t_recordingComponents = [];
    t_recordingComponents.push(t_recording_img);
    
    for (const thisComponent of t_recordingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function t_recordingRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 't_recording' ---
    // get current time
    t = t_recordingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // is it time to end the Routine? (based on local clock)
    if (t > 10) {
        continueRoutine = false
    }
    
    // *t_recording_img* updates
    if (t >= 0.0 && t_recording_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      t_recording_img.tStart = t;  // (not accounting for frame time here)
      t_recording_img.frameNStart = frameN;  // exact frame index
      
      t_recording_img.setAutoDraw(true);
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
    for (const thisComponent of t_recordingComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function t_recordingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 't_recording' ---
    for (const thisComponent of t_recordingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('t_recording.stopped', globalClock.getTime());
    // the Routine "t_recording" was not non-slip safe, so reset the non-slip timer
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
    
    for (const thisComponent of pl_global_instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl_global_instructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl_global_instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of pl1_instructions_1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl1_instructions_1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl1_instructions_1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of pl1_instructions_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl1_instructions_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl1_instructions_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of pl1_instructions_3Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl1_instructions_3Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl1_instructions_3Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of pl1_instructions_4Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl1_instructions_4Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl1_instructions_4Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of pl1_setupComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl1_setupComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl1_setupComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of pl1_taskComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl1_taskComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl1_taskComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of pl1_dataComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl1_dataComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl1_dataComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of pl2_instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl2_instructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl2_instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of pl2_setupComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl2_setupComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl2_setupComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of pl2_taskComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl2_taskComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl2_taskComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of pl2_dataComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of pl2_dataComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of pl2_dataComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
    
    for (const thisComponent of endComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of endComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of endComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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


var fail_attention_check_screenComponents;
function fail_attention_check_screenRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'fail_attention_check_screen' ---
    t = 0;
    fail_attention_check_screenClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    fail_attention_check_screenComponents = [];
    fail_attention_check_screenComponents.push(text);
    
    for (const thisComponent of fail_attention_check_screenComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function fail_attention_check_screenRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'fail_attention_check_screen' ---
    // get current time
    t = fail_attention_check_screenClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
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
    for (const thisComponent of fail_attention_check_screenComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function fail_attention_check_screenRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'fail_attention_check_screen' ---
    for (const thisComponent of fail_attention_check_screenComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "fail_attention_check_screen" was not non-slip safe, so reset the non-slip timer
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
    
    for (const thisComponent of no_consent_screenComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
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
    for (const thisComponent of no_consent_screenComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
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
    for (const thisComponent of no_consent_screenComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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

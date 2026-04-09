import type { HealthPropertyKeys } from '@types';
import mapboxgl from 'mapbox-gl';

export const INITIAL_BOUNDS = new mapboxgl.LngLatBounds(
    [-76.09405517578125, 39.49211914385648],
    [-74.32525634765625, 40.614734298694216]
);

export const countyFipsMap = {
    '42101': 'Philadelphia',
    '42045': 'Delaware',
    '42029': 'Chester',
    '42091': 'Montgomery',
    '42017': 'Bucks',
    '34021': 'Mercer',
    '34005': 'Burlington',
    '34007': 'Camden',
    '34015': 'Gloucester',
};

export const indicatorPropertyLabelMap: Record<HealthPropertyKeys, string> = {
    access2: 'Uninsured Adults',
    arthritis: 'Arthritis',
    binge: 'Binge Drinking',
    bphigh: 'High Blood Pressure',
    bpmed: 'Taking Medication for High Blood Pressure',
    cancer: 'Cancer',
    casthma: 'Asthma',
    chd: 'Heart Disease (CHD)',
    checkup: 'Had a Checkup in the Past Year',
    cholscreen: 'Cholesterol Screening',
    cognition: 'Cognitive Decline',
    colon_screen: 'Colonoscopy or Sigmoidoscopy',
    copd: 'COPD',
    csmoking: 'Current Smoking',
    dental: 'Dental Care',
    depression: 'Depression',
    diabetes: 'Diabetes',
    disability: 'Disability',
    emotionspt: 'Emotional Support',
    foodinsecu: 'Food Insecurity',
    foodstamp: 'Food Stamps',
    ghlth: 'General Health',
    hearing: 'Hearing Impairment',
    highchol: 'High Cholesterol',
    housinsecu: 'Housing Insecurity',
    inactive_comm: 'Sedentary Commute',
    indeplive: 'Independence in Living',
    isolation: 'Social Isolation',
    lacktrpt: 'Lack of Transportation',
    lpa: 'Physical Inactivity',
    mammouse: 'Mammography',
    mhlth: 'Mental Health - Not Good',
    mobility: 'Mobility Limitations',
    nocar: 'No Automobile Access',
    nohighschool: 'Educational Attainment',
    obesity: 'Obesity',
    own_burden: 'Owner Cost Burden',
    phlth: 'Physical Health',
    rent_burden: 'Renter Cost Burden',
    selfcare: 'Self-Care',
    shututility: 'Shut Off Utilities',
    sleep: 'Sleep Disorder',
    stroke: 'Stroke',
    teethlost: 'Teeth Lost',
    unemploy: 'Unemployed',
    vision: 'Vision Impairment',
};

export const activeKeys: HealthPropertyKeys[] = [
    'access2',
    'casthma',
    'cancer',
    'copd',
    'chd',
    'diabetes',
    'lpa',
    'mhlth',
    'obesity',
    'nocar',
    'inactive_comm',
    'unemploy',
    'nohighschool',
    'own_burden',
    'rent_burden',
];

export const dataTextMap: Partial<Record<HealthPropertyKeys, string[]>> = {
    access2: [
        '**%s** of adults in %s do not have health insurance.',
        'This census tract falls within the **%s percentile** of the region, indicating that there are more uninsured adults in %s than there are in %s of tracts in the DVRPC region.',
    ],
    casthma: ['**%s** of residents in %s currently have asthma.',
        'This census tract falls within the **%s percentile** of the region, indicating that %s has a higher occurrence of asthma than %s of tracts in the DVRPC region. '
    ],
    cancer: [
        '**%s** of adults in %s were diagnosed with cancer (non-skin) or melanoma in the last year.',
        'This census tract falls within the **%s percentile** of the region, indicating that %s has a higher occurrence of cancer than %s of tracts in the DVRPC region. '
    ],
    copd: [
        '**%s** of residents in %s have been diagnosed with Chronic Obstructive Pulmonary Disease (COPD).',
        'This tract falls within the **%s percentile** of the region, indicating that more people in %s have COPD than %s of tracts in the DVRPC region.'
    ],
    chd: ['**%s** of residents in %s currently have Congenital Heart Disease (CHD).',
        'This tract falls within the **%s percentile** of the region, indicating that more residents have CHD in %s than in %s of tracts in the DVRPC region.'
    ],
    diabetes: ['**%s** of residents in %s have been diagnosed with diabetes.',
        'This tract falls within the **%s percentile** of the region, indicating that %s has a higher occurrence of diabetes than %s of tracts in the DVRPC region. '
    ],
    lpa: [
        '**%s** of residents in %s do not participate in any physical activity outside of their regular job.',
        'This tract falls within the **%s percentile** of the region, indicating that more people are inactive in %s than in %s of tracts in the DVRPC region.'
    ],
    mhlth: [
        '**%s** of adults in %s self-identify as experiencing frequent mental health distress.',
        'This tract falls within the **%s percentile** of the region, indicating that more people in %s have poor mental health than in %s of tracts in the DVRPC region.'
    ],
    obesity: ['**%s** of residents in %s are affected by obesity.', 'This tract falls within the **%s** percentile of the region, indicating that more people in %s are considered obese than in %s of tracts in the DVRPC region. '],
    nocar: ['**%s** of residents in %s do not have access to a car.', 'This tract falls within the **%s percentile** of the region, indicating that more individuals do not have access to a car in %s than in %s of tracts in the DVRPC region.'],
    inactive_comm: ['**%s** of residents in %s do not commute via walking, biking, or transit.', 'This tract falls within the **%s percentile** of the region, indicating that more individuals in %s participate in sedentary commutes than in %s of tracts in the DVRPC region.'],
    unemploy: ['**%s** of residents in the labor force in %s are unemployed.', 'This tract falls within the **%s percentile** of the region, indicating that there are more people experiencing unemployment in Census Tract %s than in %s of tracts in the DVRPC region.'],
    nohighschool: [
        '**%s** of residents aged 25+ in %s do not hold a high school diploma or equivalent degrees',
        'This tract falls within the **%s percentile** of the region, indicating that more individuals 25+ in %s did not graduate high school than in %s of tracts in the DVRPC region. '
    ],
    own_burden: [
        '**%s** of home owners in %s spend more than 30% of their household income on housing costs.',
        'This tract falls within the **%s percentile** of the region, indicating that more house owners in %s experience severe cost burden than in %s of tracts in the DVRPC region. '
    ],
    rent_burden: [
        '**%s** of renters in %s spend 30% or more of their household income on housing costs.',
        'This tract falls within the **%s percentile** of the region, indicating that more house owners in %s experience severe cost burden than in %s of tracts in the DVRPC region. '
    ],
};

export const descriptionMap: Record<HealthPropertyKeys, string[]> = {
    access2: [
        'At its most basic level, health insurance is a way to pay for healthcare. It reduces the financial risks for individuals when medical expenses are incurred. Health insurance coverage enables individuals to better afford preventive care when they are healthy and acute care when they are sick or injured. While insurance alone does not guarantee good health, it plays a critical role in determining whether and when people receive care. Research shows that uninsured adults are less likely to receive preventive services or manage chronic conditions like diabetes, cancer, and heart disease, and uninsured children are less likely to receive appropriate treatment for asthma, immunizations, dental care, and routine well-child visits.',
        'Despite its importance, many people remain uninsured. Most uninsured individuals live in low-income, working families, and nearly two-thirds of uninsured workers are employed by organizations that do not offer health benefits. More than 80 percent of uninsured people are in families earning less than 400 percent of the federal poverty level, with nearly half below 200 percent. Coverage gaps are also more common among adults ages 19–64 and among certain population groups.',
    ],
    casthma: [
        'Asthma is a chronic lung disease that inflames and narrows the airways, causing coughing, wheezing, chest tightness, and difficulty breathing. Although it cannot be cured, asthma can be managed with medication and healthy lifestyle practices. When poorly controlled, it can lead to emergency visits, hospitalizations, and, in severe cases, death. Asthma affects people of all ages but often begins in childhood and is a leading cause of school absenteeism.',
        'Environmental and socioeconomic factors play a major role in asthma outcomes. Low-income and minority populations experience higher rates of asthma complications, driven in part by greater exposure to air pollution, mold, pests, and other environmental hazards, as well as barriers to healthcare. Chronic stress and unsafe living or working conditions can further worsen symptoms. These patterns highlight the importance of addressing environmental conditions alongside medical treatment to improve asthma outcomes and quality of life.',
    ],
    cancer: [
        'Cancer refers to a group of diseases characterized by the uncontrolled growth of abnormal cells in the body. While genetics and individual behaviors play a role, cancer risk is also shaped by environmental and social conditions. Exposure to air and water pollution, hazardous materials, and secondhand smoke can increase cancer risk, as can limited access to preventive care such as screenings and early detection services. Cancer prevalence is often higher in communities facing long-term environmental burdens, economic hardship, and barriers to healthcare, highlighting how place-based factors influence health outcomes.',
        'Cancer matters for planners because many of these influencing factors are closely tied to neighborhood environments and infrastructure. Community conditions affect exposure to pollution, opportunities for physical activity, access to healthy food, and the ability to reach medical services. Over time, these place-based factors can shape cancer risk and survival, making cancer prevalence an important indicator of overall community health and well-being.',
    ],
    copd: [],
    arthritis: [],
    binge: [],
    bphigh: [],
    bpmed: [],
    chd: [],
    checkup: [],
    cholscreen: [],
    cognition: [],
    colon_screen: [],
    csmoking: [],
    dental: [],
    depression: [],
    diabetes: [],
    disability: [],
    emotionspt: [],
    foodinsecu: [],
    foodstamp: [],
    ghlth: [],
    hearing: [],
    highchol: [],
    housinsecu: [],
    inactive_comm: [],
    indeplive: [],
    isolation: [],
    lacktrpt: [],
    lpa: [],
    mammouse: [],
    mhlth: [],
    mobility: [],
    nocar: [],
    nohighschool: [],
    obesity: [],
    own_burden: [],
    phlth: [],
    rent_burden: [],
    selfcare: [],
    shututility: [],
    sleep: [],
    stroke: [],
    teethlost: [],
    unemploy: [],
    vision: [],
};

export interface Question {
  id: number;
  text: string;
  type: 'mcq' | 'short-answer' | 'dropdown';
  options?: string[];
  points: number;
  required: boolean;
  maxChars?: number;
}

export const questions: Question[] = [
{
  id: 1,
  text: 'Which of the following symptoms is most commonly associated with myocardial infarction?',
  type: 'mcq',
  options: ['Chest pain', 'Skin rash', 'Hearing loss', 'Blurred vision'],
  points: 5,
  required: true
},
{
  id: 2,
  text: 'What is the primary function of insulin in the human body?',
  type: 'mcq',
  options: [
  'Facilitates glucose uptake into cells',
  'Increases blood pressure',
  'Stimulates red blood cell production',
  'Promotes bone resorption'],

  points: 5,
  required: false
},
{
  id: 3,
  text: 'Choose the correct normal adult respiratory rate range.',
  type: 'dropdown',
  options: [
  '8-12 breaths per minute',
  '12-20 breaths per minute',
  '20-30 breaths per minute',
  '30-40 breaths per minute'],

  points: 3,
  required: true
},
{
  id: 4,
  text: 'Cirrhosis of the liver is most frequently caused by which of the following?',
  type: 'dropdown',
  options: [
  'Chronic alcohol abuse',
  'Acute viral gastroenteritis',
  'Iron deficiency anemia',
  'Hyperthyroidism'],

  points: 3,
  required: false
},
{
  id: 5,
  text: 'Explain the physiological impact of dehydration on the kidneys.',
  type: 'short-answer',
  points: 10,
  required: true,
  maxChars: 5000
},
{
  id: 6,
  text: 'A patient presents with polyuria, polydipsia, and unexplained weight loss. Which condition is most likely?',
  type: 'mcq',
  options: [
  'Type 1 Diabetes Mellitus',
  'Cushing syndrome',
  'Hypothyroidism',
  'Addison disease'],

  points: 5,
  required: false
},
{
  id: 7,
  text: 'Which cell type is the primary target of HIV infection?',
  type: 'dropdown',
  options: [
  'CD4+ T lymphocytes',
  'B lymphocytes',
  'Neutrophils',
  'Eosinophils'],

  points: 5,
  required: true
},
{
  id: 8,
  text: 'What is the most common cause of iron deficiency anemia in premenopausal women?',
  type: 'mcq',
  options: [
  'Menstrual blood loss',
  'Dietary insufficiency',
  'Chronic kidney disease',
  'Bone marrow failure'],

  points: 3,
  required: false
},
{
  id: 9,
  text: 'Which of the following is a hallmark histological finding in Alzheimer disease?',
  type: 'mcq',
  options: [
  'Neurofibrillary tangles and amyloid plaques',
  'Lewy bodies in the substantia nigra',
  'Demyelination of white matter',
  'Spongiform encephalopathy'],

  points: 8,
  required: true
},
{
  id: 10,
  text: 'Which valve is most commonly affected in rheumatic heart disease?',
  type: 'dropdown',
  options: [
  'Mitral valve',
  'Aortic valve',
  'Tricuspid valve',
  'Pulmonary valve'],

  points: 5,
  required: false
},
{
  id: 11,
  text: 'What is the most common type of thyroid cancer?',
  type: 'mcq',
  options: [
  'Papillary carcinoma',
  'Follicular carcinoma',
  'Medullary carcinoma',
  'Anaplastic carcinoma'],

  points: 5,
  required: false
},
{
  id: 12,
  text: 'Which electrolyte imbalance is most dangerous in causing cardiac arrhythmias?',
  type: 'mcq',
  options: [
  'Hyperkalemia',
  'Hyponatremia',
  'Hypocalcemia',
  'Hypermagnesemia'],

  points: 8,
  required: true
},
{
  id: 13,
  text: 'Which organ is the primary site of hematopoiesis in adults?',
  type: 'mcq',
  options: ['Bone marrow', 'Spleen', 'Liver', 'Thymus'],
  points: 3,
  required: false
},
{
  id: 14,
  text: 'A granulomatous inflammation with caseating necrosis is characteristic of which disease?',
  type: 'mcq',
  options: [
  'Tuberculosis',
  'Sarcoidosis',
  'Crohn disease',
  'Foreign body reaction'],

  points: 5,
  required: false
},
{
  id: 15,
  text: 'Which tumor marker is most commonly elevated in hepatocellular carcinoma?',
  type: 'mcq',
  options: ['Alpha-fetoprotein (AFP)', 'CA-125', 'PSA', 'CEA'],
  points: 5,
  required: false
},
{
  id: 16,
  text: 'Describe the pathophysiology of Type 2 Diabetes Mellitus in 2-3 sentences. Include the role of insulin resistance and beta-cell dysfunction.',
  type: 'short-answer',
  points: 10,
  required: true,
  maxChars: 5000
},
{
  id: 17,
  text: 'Which of the following is the most common cause of nephrotic syndrome in children?',
  type: 'mcq',
  options: [
  'Minimal change disease',
  'Membranous nephropathy',
  'Focal segmental glomerulosclerosis',
  'IgA nephropathy'],

  points: 5,
  required: false
},
{
  id: 18,
  text: 'Reed-Sternberg cells are pathognomonic for which of the following malignancies?',
  type: 'mcq',
  options: [
  'Hodgkin lymphoma',
  'Non-Hodgkin lymphoma',
  'Chronic lymphocytic leukemia',
  'Multiple myeloma'],

  points: 8,
  required: true
},
{
  id: 19,
  text: 'Which coagulation pathway is assessed by the Prothrombin Time (PT) test?',
  type: 'mcq',
  options: [
  'Extrinsic pathway',
  'Intrinsic pathway',
  'Common pathway only',
  'Fibrinolytic pathway'],

  points: 5,
  required: false
},
{
  id: 20,
  text: 'Which of the following conditions is characterized by antibodies against the acetylcholine receptor?',
  type: 'mcq',
  options: [
  'Myasthenia gravis',
  'Multiple sclerosis',
  'Guillain-Barré syndrome',
  'Amyotrophic lateral sclerosis'],

  points: 5,
  required: false
}];
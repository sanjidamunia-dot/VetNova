  // System Global Tracking Core State Storage Setup
        let currentStep = 1;
        const totalSteps = 4;
       
        let trackingData = {
            petType: '',
            gender: '',
            age: '',
            neutered: '',
            description: '',
            mainSymptom: '',
            
            details: {}
        };

        // Complete Clinical Mapping Dataset Matching Tisha's Functional Rules
       const symptomDatabase = {
    Dog: [
        { id: 'dog_vomit', label: 'Vomiting / Gagging', icon: 'fa-soap' },
        { id: 'dog_bloat', label: 'Swollen / Bloated Belly', icon: 'fa-circle' },
        { id: 'dog_lethargy', label: 'Lethargy / Weakness', icon: 'fa-bed' },
        { id: 'dog_appetite', label: 'Loss of Appetite', icon: 'fa-utensils' }
    ],
    Cat: [
        { id: 'cat_vomit', label: 'Vomiting / Hairballs', icon: 'fa-soap' },
        { id: 'cat_lethargy', label: 'Hiding / Lethargy', icon: 'fa-eye-slash' },
        { id: 'cat_urinary', label: 'Frequent Litterbox Visits', icon: 'fa-box' }
    ],
    Bird: [
        { id: 'bird_feathers', label: 'Plucking Feathers', icon: 'fa-feather' },
        { id: 'bird_lethargy', label: 'Fluffed Feathers / Inactive', icon: 'fa-cloud' }
    ],
    Rabbit: [
        { id: 'rabbit_gi', label: 'Stasis / Not eating', icon: 'fa-carrot' },
        { id: 'rabbit_teeth', label: 'Dental Issues / Drooling', icon: 'fa-tooth' },
        { id: 'rabbit_ears', label: 'Ear Infections / Head Tilt', icon: 'fa-ear-listen' }
    ],
    Turtle: [
        { id: 'turtle_shell', label: 'Soft Shell / Lesions', icon: 'fa-shield-alt' },
        { id: 'turtle_resp', label: 'Wheezing / Nasal Discharge', icon: 'fa-wind' },
        { id: 'turtle_eyes', label: 'Swollen Eyes', icon: 'fa-eye' }
    ],
    Hamster: [
        { id: 'hamster_tail', label: 'Wet Tail (Diarrhea)', icon: 'fa-water' },
        { id: 'hamster_cheek', label: 'Pouch Impaction', icon: 'fa-box-open' },
        { id: 'hamster_skin', label: 'Hair Loss / Skin Irritation', icon: 'fa-cat' }
    ],
    Fish: [
        { id: 'fish_swimming', label: 'Erratic Swimming', icon: 'fa-fish' },
        { id: 'fish_scales', label: 'Discolored/Raised Scales', icon: 'fa-grip-lines' },
        { id: 'fish_white_spots', label: 'White Spots (Ich)', icon: 'fa-snowflake' }
    ]
};
        // Step 3 Specific Conditional Advanced Questions Library
        const conditionalQuestions = {
            'dog_vomit': [
                { key: 'vomit_freq', text: 'Is your pet trying to vomit but nothing comes up?', options: ['Yes, repeatedly', 'No, actual food comes up'] },
                { key: 'vomit_blood', text: 'Do you see any trace of blood or dark fluid in the vomit?', options: ['Yes', 'No'] }
            ],
            'dog_bloat': [
                { key: 'bloat_look', text: 'Does their b belly look exceptionally hard, firm, or visibly bloated?', options: ['Yes, very tight', 'Slightly', 'No'] },
                { key: 'bloat_pain', text: 'Does your pet whine, pant, or look distressed when you gently touch their stomach?', options: ['Yes, in pain', 'No'] }
            ],
            'cat_vomit': [
                { key: 'cat_vom_freq', text: 'Has the cat vomited multiple times within the last 24 hours?', options: ['Yes, frequently', 'No, just once'] }
            ],
            'cat_urinary': [
                { key: 'cat_uri_pain', text: 'Is your cat crying out or straining hard while trying to urinate?', options: ['Yes, constantly', 'No'] }
            ]
        };

        // DOM Initial Interactive Node Binding Architecture
        document.addEventListener('DOMContentLoaded', () => {
            setupGridSelectors('pet-type-grid', 'petType', true);
            setupGridSelectors('pet-gender-grid', 'gender');
            setupGridSelectors('pet-neutered-grid', 'neutered');
            
            document.getElementById('pet-age').addEventListener('change', (e) => {
                trackingData.age = e.target.value;
            });
        });

        function setupGridSelectors(gridId, dataKey, triggersSymptomReload = false) {
            const cards = document.querySelectorAll(`#${gridId} .option-card`);
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    cards.forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    trackingData[dataKey] = card.getAttribute('data-value');
                    
                    if(triggersSymptomReload) {
                        populateSymptomsList();
                    }
                });
            });
        }

        // Generate Dynamic Step 2 Lists Based on Step 1 Selections
      function populateSymptomsList() {
    const container = document.getElementById('symptom-selector-container');
    container.innerHTML = '';
    const selectedType = trackingData.petType || 'Dog';
    
    document.getElementById('step-2-title').innerText = `What symptoms is your ${selectedType.toLowerCase()} showing?`;
    
    const dynamicList = symptomDatabase[selectedType] || symptomDatabase['Dog'];
    
    dynamicList.forEach(symptom => {
        const div = document.createElement('div');
        div.className = 'symptom-item';
        div.setAttribute('data-id', symptom.id);
        div.innerHTML = `<i class="fas ${symptom.icon}"></i> <span>${symptom.label}</span>`;
        
        div.addEventListener('click', () => {
            document.querySelectorAll('.symptom-item').forEach(i => i.classList.remove('selected'));
            div.classList.add('selected');
            trackingData.mainSymptom = symptom.id;
        });
        
        container.appendChild(div);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const descBox = document.getElementById('symptom-description');
    if (descBox) {
        descBox.addEventListener('input', (e) => {
            trackingData.description = e.target.value;
        });
    }
});
        // Generate Dynamic Step 3 Conditional Follow-up Forms
        function populateSymptomDetailsQuestions() {
            const wrapper = document.getElementById('dynamic-questions-wrapper');
            wrapper.innerHTML = '';
            
            const selectedType = trackingData.petType || 'Pet';
            document.getElementById('step-3-title').innerText = `Tell us more about your ${selectedType.toLowerCase()}'s symptoms`;
            
            const questions = conditionalQuestions[trackingData.mainSymptom];
            
            if (!questions) {
                // Default generic safety baseline fallback list if option has no specialized matrix
                wrapper.innerHTML = `
                    <div class="detail-question-box">
                        <div class="detail-question-title">Is your pet experiencing severe lethargy, hiding, or refusal to eat?</div>
                        <div class="options-grid" data-q="generic_lethargy">
                            <div class="option-card" data-val="Yes">Yes</div>
                            <div class="option-card" data-val="No">No</div>
                        </div>
                    </div>
                    <div class="detail-question-box">
                        <div class="detail-question-title">Has this symptom persisted continuously for more than 48 hours?</div>
                        <div class="options-grid" data-q="generic_duration">
                            <div class="option-card" data-val="Yes">Yes</div>
                            <div class="option-card" data-val="No">No</div>
                        </div>
                    </div>
                `;
            } else {
                questions.forEach(q => {
                    const qBox = document.createElement('div');
                    qBox.className = 'detail-question-box';
                    
                    let optionsHtml = `<div class="options-grid" data-q="${q.key}">`;
                    q.options.forEach(opt => {
                        optionsHtml += `<div class="option-card" data-val="${opt}">${opt}</div>`;
                    });
                    optionsHtml += `</div>`;
                    
                    qBox.innerHTML = `
                        <div class="detail-question-title">${q.text}</div>
                        ${optionsHtml}
                    `;
                    wrapper.appendChild(qBox);
                });
            }

            // Bind click events to all dynamically rendered custom radio option elements
            wrapper.querySelectorAll('.options-grid').forEach(grid => {
                const qKey = grid.getAttribute('data-q');
                trackingData.details[qKey] = ''; // Initialize state entry
                
                const gridCards = grid.querySelectorAll('.option-card');
                gridCards.forEach(card => {
                    card.addEventListener('click', () => {
                        gridCards.forEach(c => c.classList.remove('selected'));
                        card.classList.add('selected');
                        trackingData.details[qKey] = card.getAttribute('data-val');
                    });
                });
            });
        }

        // ================= INTERACTIVE WORKFLOW STEP NAVIGATION ENGINE =================
        function navigateStep(direction) {
            // Validate inputs before continuing forward
            if (direction === 1 && !validateCurrentStepForm()) {
                alert('Please complete all requested fields on the current step before continuing.');
                return;
            }

            // Hide active step content wrapper UI panel
            document.getElementById(`step-${currentStep}`).classList.remove('active');
            
            // Increment/Decrement state
            currentStep += direction;
            if (currentStep < 1) currentStep = 1;
            if (currentStep > totalSteps) currentStep = totalSteps;

            // Show new active step content panel wrapper UI element
            document.getElementById(`step-${currentStep}`).classList.add('active');

            // Conditional workflow setup handlers
            if (currentStep === 3 && direction === 1) {
                populateSymptomDetailsQuestions();
            }
            if (currentStep === 4) {
                generateClinicalTriageReport();
            }

            updateProgressIndicators();
        }

        function validateCurrentStepForm() {
            if (currentStep === 1) {
                return (trackingData.petType && trackingData.gender && trackingData.age && trackingData.neutered);
            }
            if (currentStep === 2) {
                return (trackingData.mainSymptom);
            }
            if (currentStep === 3) {
                // Check if at least one question option configuration has been assigned a value selection
                return Object.values(trackingData.details).every(val => val !== '');
            }
            return true;
        }

        function updateProgressIndicators() {
            // Render node configuration classes
            for (let i = 1; i <= totalSteps; i++) {
                const node = document.getElementById(`node-${i}`);
                if (i < currentStep) {
                    node.className = 'step-node completed';
                } else if (i === currentStep) {
                    node.className = 'step-node active';
                } else {
                    node.className = 'step-node';
                }
            }

            // Fill line scaling percentage matching positions
            const fillPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
            document.getElementById('progress-line-fill').style.width = `${fillPercentage}%`;

            // Display button validation visibility controls toggle
            document.getElementById('btn-back').style.display = (currentStep === 1 || currentStep === 4) ? 'none' : 'flex';
            
            const nextBtn = document.getElementById('btn-next');
            if (currentStep === 3) {
                nextBtn.innerHTML = `Finish Assessment <i class="fas fa-check-circle"></i>`;
            } else if (currentStep === 4) {
                nextBtn.innerHTML = `Download Report<i class="fas fa-calendar-alt"></i>`;
             
            } else {
                nextBtn.innerHTML = `Continue <i class="fas fa-arrow-right"></i>`;
                nextBtn.onclick = () => navigateStep(1);
            }
        }

        // ================= DYNAMIC AUTOMATED TRIAGE REPORT ENGINE =================
        function generateClinicalTriageReport() {
            document.getElementById('report-pet-name').innerText = `Health Report for your ${trackingData.petType}`;
            document.getElementById('report-pet-meta').innerText = `${trackingData.petType} • ${trackingData.gender} • ${trackingData.age} • Neutered: ${trackingData.neutered}`;
            
            const outputContainer = document.getElementById('report-diagnostics-output');
            outputContainer.innerHTML = '';

            let diagnosisTitle = "General Clinical Observation Needed";
            let severityClass = "severity-medium";
            let severityText = "Moderate Status Risk Check";
            let symptomsSummaryText = "Your pet is showing signs of discomfort or physiological distress.";
            let clinicianAdviceList = [
                "1. Monitor vitals and water intake levels closely for the next 12 hours.",
                "2. Keep your pet in a quiet, temperature-controlled, comfortable environment.",
                "3. Prepare a history log of dietary changes to show your clinic professional."
            ];
            let questionsToAskVet = [
                "Could this symptom be triggered by a sudden food/diet change?",
                "Are there non-invasive diagnostic tests you recommend first?"
            ];

            // Diagnostic Logic Matrix Evaluation
            if (trackingData.mainSymptom === 'dog_vomit') {
                if (trackingData.details['vomit_freq'] === 'Yes, repeatedly') {
                    diagnosisTitle = "Potential Gastric Dilation-Volvulus (GDV / Bloat Warning)";
                    severityClass = "severity-high";
                    severityText = "CRITICAL EMERGENCY TARGET INDICATOR";
                    symptomsSummaryText = "Unproductive vomiting / retching where nothing comes up is a primary classic medical emergency indicator for systemic bloat.";
                    clinicianAdviceList = [
                        "DO NOT feed or give water to your pet right now.",
                        "Take your dog to the nearest emergency veterinary facility IMMEDIATELY.",
                        "Avoid any physical exercise or pressure on the abdominal walls."
                    ];
                    questionsToAskVet = [
                        "Is my dog showing signs of shock or gastric torsion?",
                        "Is immediate emergency decompression surgery required?"
                    ];
                } else {
                    diagnosisTitle = "Acute Gastroenteritis or Dietary Indiscretion";
                    symptomsSummaryText = "Your pet is producing actual stomach contents, suggesting localized gastric lining inflammation or mild ingestion toxicity issues.";
                }
            } 
            else if (trackingData.mainSymptom === 'dog_bloat') {
                if (trackingData.details['bloat_look'] === 'Yes, very tight' || trackingData.details['bloat_pain'] === 'Yes, in pain') {
                    diagnosisTitle = "Severe Abdominal Distension / Gastric Torsion Risk";
                    severityClass = "severity-high";
                    severityText = "CRITICAL EMERGENCY STATUS";
                    symptomsSummaryText = "A rigid, hard, or highly tender bloated belly is an acute clinical crisis indicator that requires immediate medical decompression treatment.";
                    clinicianAdviceList = [
                        "Do not touch or massage the swollen stomach region.",
                        "Transport your pet to a veterinary trauma hospital immediately.",
                        "Keep stress levels minimal during transportation."
                    ];
                }
            }
            else if (trackingData.mainSymptom === 'cat_urinary') {
                if (trackingData.details['cat_uri_pain'] === 'Yes, constantly') {
                    diagnosisTitle = "Suspected Feline Lower Urinary Tract Disease (FLUTD / Blockage)";
                    severityClass = "severity-high";
                    severityText = "HIGH EMERGENCY RISK";
                    symptomsSummaryText = "Urinary tract blockages can rapidly lead to systemic toxic shock within 24 hours if untreated.";
                    clinicianAdviceList = [
                        "Check your litter box for tiny drops of bloody urine.",
                        "Seek immediate medical clearance to bypass acute bladder rupture risks."
                    ];
                }
            }

            // HTML Synthesis Processing Output Injection Template Layout Construction
            outputContainer.innerHTML = `
                <div class="diagnosis-card">
                    <span class="diagnosis-severity ${severityClass}">${severityText}</span>
                    <h3 style="margin-bottom:10px; font-size:18px; color:var(--text-dark);"><i class="fas fa-stethoscope" style="color:var(--primary-color);"></i> ${diagnosisTitle}</h3>
                    <p style="font-size:14px; color:var(--text-light); line-height:1.6;">${symptomsSummaryText}</p>
                </div>

                <div style="margin-top:20px;">
                    <h4 style="font-size:15px; font-weight:600; color:var(--text-dark);"><i class="fas fa-clipboard-list" style="color:var(--primary-color);"></i> Recommended Action Plan</h4>
                    <ul class="advice-list">
                        ${clinicianAdviceList.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>

                <div class="vet-questions-box">
                    <h4><i class="fas fa-comment-medical"></i> Questions to Ask Your Vet Clinic:</h4>
                    <ul style="padding-left:20px; font-size:13px; color:#1e40af; line-height:1.6;">
                        ${questionsToAskVet.map(q => `<li style="margin-bottom:5px;">"${q}"</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        function resetTracker(e) {
            e.preventDefault();
            currentStep = 1;
            trackingData = { petType: '', gender: '', age: '', neutered: '', mainSymptom: '', details: {} };
            
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            document.getElementById('pet-age').value = '';
            
            document.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
            document.getElementById('step-1').classList.add('active');
            
            updateProgressIndicators();
        }
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, Pressable, KeyboardAvoidingView, FlatList} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Feather, AntDesign, MaterialIcons, Ionicons, FontAwesome, Fontisto } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Loading from './Loading';
import SideBarHistory from '../components/SideBarHistory'


const symptomsList = [
    "fever", "chills", "fatigue", "headache", "nausea", "vomiting", "diarrhea", "constipation", "abdominal pain", "chest pain", "shortness of breath", "cough", "sore throat", "runny nose", "congestion", "dizziness", "lightheadedness", "muscle pain", "joint pain", "swelling", "redness", "rash", "itching", "hives", "blistering", "peeling skin", "dry skin", "jaundice", "pale skin", "dark urine", "bloody stools", "weight loss", "weight gain", "loss of appetite", "increased appetite", "night sweats", "cold sweats", "difficulty swallowing", "hoarseness", "wheezing", "heart palpitations", "irregular heartbeat", "high blood pressure", "low blood pressure", "numbness", "tingling", "weakness", "paralysis", "confusion", "memory loss", "difficulty concentrating", "mood swings", "depression", "anxiety", "irritability", "insomnia", "excessive sleepiness", "blurred vision", "double vision", "eye pain", "sensitivity to light", "hearing loss", "ringing in ears", "ear pain", "sinus pressure", "toothache", "gum bleeding", "sores in mouth", "dry mouth", "excessive thirst", "frequent urination", "difficulty urinating", "blood in urine", "back pain", "neck pain", "stiffness", "tremors", "seizures", "loss of balance", "difficulty walking", "hair loss", "brittle nails", "fever blisters", "swollen lymph nodes", "chronic cough", "vomiting blood", "coughing blood", "bruising easily", "slow wound healing", "excessive sweating", "chills with fever", "swollen joints", "pain with movement", "sensitivity to cold", "sensitivity to heat", "irregular menstrual cycles", "breast lumps", "nipple discharge",
    "abnormal heart sounds", 
    "absent reflexes", "acid reflux", "acne", 
    "addiction", "agitation", "alcohol intolerance", "allergic reaction", "alternating constipation and diarrhea", "anemia", "anger outbursts", "ankle swelling", "aphasia", "apnea", "arm weakness", "asthma symptoms", "ataxia", "back stiffness", "bad breath", "behavioral changes", "belching", "binge eating", "blackheads", "blackouts", "blurred peripheral vision", "blue lips", "blurred edges in vision", "body aches", "bone deformities", "bone fractures", "bowel incontinence", "breast tenderness", "brittle bones", "bronchospasm", "bruising without trauma", "bulging eyes", "burning sensation during urination", "butterfly rash", "calf pain", "can’t control emotions", "carpal tunnel symptoms", "cheilitis", "chest tightness", "chronic fatigue", "clay-colored stools", "clenching jaw", "cloudy urine", "clubbed fingers", "cognitive decline", "cold intolerance", "collarbone pain", "color blindness", "confusion at night", "congenital malformations", "conjunctivitis", "constant hunger", "convulsions", "cool extremities", "cramping during movement", "cravings for salt", "cyanosis", "darkened skin patches", "daytime drowsiness", "delayed growth", "delirium", "delusions", "dementia", "dermatitis", "desire to drink excess water", "difficulty breathing while lying down", "difficulty climbing stairs", "difficulty chewing", "difficulty reading", "difficulty remembering faces", "dilated pupils", "discolored nails", "disorientation", "distended abdomen", "drooling", "drooping eyelid", "dry cough", "dry eyes", "dry scalp", "early satiety", "eczema", "electric shock sensations", "elbow pain", "enlarged liver", "enlarged spleen", "enlarged tonsils", "erectile dysfunction", "excess earwax", "excess gas", "excessive blinking", "excessive body hair", "excessive yawning", "eye discharge", "eye floaters", "facial flushing", "facial pain", "fainting spells", "fear of open spaces", "fear of tight spaces", "fetal movements stop", "fever of unknown origin", "finger cramping", "flaky skin", "flank pain", "flashing lights in vision", "flatulence", "flushed cheeks", "foamy urine", "food intolerance", "foot pain", "foot swelling", "frequent bruising", "frequent dislocations", "frequent falls", "frequent infections", "frostbite", "gastric bleeding", "gastroesophageal burning", "general body stiffness", "giddy feeling", "glossitis", "goiter", "gout symptoms", "gray vision", "greenish stool", "grinding teeth", "gum overgrowth", "gum sensitivity", "hand cramping", "hand numbness",
     "hearing loss in one ear", "heel pain", "hiccups", "high-pitched breathing",
      "hip pain", "hoarse crying", "hoarse voice", "hot flashes", "hyperactivity", "hyperpigmentation", "hypopigmentation", "impulsivity", "inability to cry", "inability to feel pain", "inability to speak", "increased libido", "increased reflexes", "increased salivation", "increased urination at night", "indigestion", "inflexibility", "ingrown nails", "inguinal swelling", "itching in ears", "itchy scalp", "jitteriness", "joint clicking", "knee swelling", "lack of coordination", "lactose intolerance", "laryngitis", "leg cramping", "leg dragging", "light sensitivity", "lightheadedness after standing", "lip swelling", "loss of body hair", "loss of taste", "loss of voice", "low blood sugar symptoms", "low-grade fever", "low libido", "low muscle tone", "low pulse", "lower back stiffness", "lymph swelling", "malabsorption symptoms", "malodorous discharge", "manic episodes", "mask-like facial expression", "melena", "memory gaps", "menstrual cramps", "mid-back pain", "milky discharge", "misaligned teeth", "miscarriage", "missing milestones", "morning joint stiffness", "mucous in stool", "muscle atrophy", "muscle spasms", "muscle stiffness after rest", "muscle wasting", "nasal flaring", "nasal polyps", "neck clicking", "neck vein distension", "needle-like pain", "nervous energy", "no bowel movements", "nosebleeds", "numb nose", "oily skin", "open sores", "overheating", "pain behind the eyes", "pain in wrist", "pain in one eye", 
      "pain with chewing", "pain with urination", "painful defecation", "pale fingertips", "palpitations during rest", "panic attacks", "paranoia", "patchy hair loss", "patchy skin color", "pelvic pain", "pencil-thin stool", "persistent bloating", "persistent hiccups", "persistent nausea", "petechiae", "phobia of heights", "pink eye", "poor focus", "poor grooming", "post-nasal drip", "prickling sensations", "profuse sweating", "prolonged bleeding", "prolonged fatigue", "protruding tongue", "protruding belly", "puffy face", "purple fingertips", "purple toes", "pustules", "recurrent back pain", "recurrent infections", "recurrent sore throats", "rectal bleeding", "restless legs", "retching", "rigid posture", "ringworm", "rotator cuff pain", "roundworm infection", "salty skin", "scaly patches", "scarring hair loss", "scarring skin", "severe leg cramps", "shallow breathing", "shooting pain", "shuffling gait", "slurred speech", "slow blinking", "slow healing wounds", "slow movements", "small pupil size", "snapping joints", "social withdrawal", "speech difficulty", "spider veins", "split ends", "spotty nails", "staring episodes", "stiff neck", "stool incontinence", "straining during bowel movements", "stress intolerance", "stretch marks", "sunken eyes", "sweaty palms", "swollen belly", "swollen face", "swollen fingers", "swollen toes", "swollen uvula", "taste of blood in mouth", "tender abdomen", "thick mucus", "throat clearing", "throat tightness", "thumb pain", "tingling tongue", "toenail thickening", "tongue swelling", "tongue-tied", "trouble finishing tasks", "trouble swallowing liquids", "twitching muscles", "ulcers in stomach", "unconsciousness", "underarm swelling", "unexplained crying", "unexplained itching", "unsteady walking", "urinary dribbling", "urinary frequency", "urinary hesitation", "vaginal dryness", "vaginal odor", "vascular swelling", "vertigo", "voice changes", "watery eyes", "weak abdominal muscles", "weak leg muscles", "wheezing on exertion", "white patches on tongue", "wrinkled skin", "yellow tongue",
    "abdominal bloating",
     "abnormal gait", "abscess formation", "acidic taste in mouth", "altered speech", "anal itching", "ankle instability", "anorexia", "arm swelling", "asymmetric facial features", "balance issues", "band-like headache", "bitter taste in mouth", "bloodshot eyes", "blurry spots in vision", "body chills without fever", "bony growths", "brittle teeth", "burning sensation in feet", "calcification under skin", "calf cramps", "chapped lips", "cherry-red skin patches", "clogged ears", "cold hands", "collapsing veins", "constricted pupils", "convulsive movements", "cracking joints", "cracked heels", "crawling sensations", "crooked spine", "dark spots on skin", "decreased range of motion", "delayed reflexes", "depression after eating", "deviation of eyes", "difficulty digesting fatty foods", "difficulty pronouncing words", "discolored gums", "discolored sclera", "disproportionate limb growth", "distorted vision", "dry cracked knuckles", "dry lips", "dry tongue", "early waking", "ear discharge", "elbow stiffness", "enlarged breasts in males", "enlarged fingertips", "enlarged knuckles", "enlarged neck veins", "euphoria", "excessive dandruff", "excessive oil production",
      "excessive tearing", "facial hair growth in women", "facial sagging", 
      "facial twitching", "fingernail discoloration", "fishy body odor", "flaking lips", "flashing lights before headache", "foot cramps", "foot deformity", "foot tingling", "frequent burping", "frequent hiccups", "gallbladder pain", "gangrene", "gassy sensation", 
      "general discomfort", "giddiness", "goosebumps without cause", "gum abscess", "hacking cough", "hair thinning", "hand pain", "hard bumps under skin", "hard stools", "heart murmur", "heartburn after meals", "heavy periods", "hip instability", "hot and cold flashes", "hot skin", "hyperventilation", "hypersensitive reflexes", 
      "hypothermia", "inability to bend fingers", "inability to open jaw", "inability to whistle", "indented nails", "inflamed gums", "intestinal gurgling", "irregular breathing", "irregular teeth", "itching after shower", "itching around eyes", "jaw pain", "jaw popping", "jerky hand movements", "joint laxity", "knee buckling", "knee instability", 
      "knuckle swelling", "lacy red rash", "lactation not related to pregnancy", "lactic acid buildup", "large pores", "late puberty", "leg dragging while walking", "lump in armpit", "lump in breast", "lump in groin", "lump in neck", "lumpy tongue", "malodorous sweat", "metallic taste in mouth", "mid-chest discomfort", "midnight hunger", "migratory joint pain", "misshapen teeth", "misshapen toes", "missing fingernails", "morning bloating", "mouth ulcers", "mouth-breathing", "muscle bulging", "muscle hardening", "muscle knots", 
      "muscle rigidity", "nasal crusting", "nasal discharge", "nasal dryness", "nasal pain", "navel discharge", "neck bulges", "neck creaking", "neck pain when moving", "needle-like sensations", "nipple inversion", "nodules under skin", "noisy breathing", "nose deformity", "nose twitching", "numb fingertips", "numb lips", "oil buildup on scalp", "oily discharge", "one-sided chest pain", "open wounds", "orange-colored urine", "out-of-body experiences", "overactive gag reflex", "pain after eating", "pain in ankles", "pain in buttocks", "pain in calves", "pain in groin", "pain on scalp",
       "palmar sweating", "palpable abdominal mass", "persistent gagging", "persistent thirst", "phantom smells", "pins-and-needles sensation", "pitting edema", "poor depth perception", "postural instability", "prolonged hiccuping", "protruding belly button", "protruding clavicle", "purple skin patches", "raised red dots on skin", "red patches on tongue", "red streaks on skin", "retching with no vomiting", "rough skin texture", "runny ear", "saliva overproduction", "sensitivity to texture", "shaky hands", "shallow chest movements", "sharp neck pain", "shivering without cause", "shortened fingernails", "shortened toe length", "shoulder clicking", "shoulder immobility", "shoulder instability", "side pain", "skin dimpling", "skin pitting", "skin tags", "skin tenderness", "skipping heartbeats", "small lumps under tongue", "snapping shoulder", "spinal tenderness", "spongy gums", "spotted skin", "stiff fingers", "stomach gurgling", "stomach tenderness", "stretching pain", "stuck feeling in throat", "sudden loss of consciousness", "sudden onset of blindness", "sudden weight gain", "swelling at surgical site", "swelling in cheeks", "swelling in hips", "swollen ankle joints", "swollen collarbone", "swollen earlobes", "swollen eyelids", "swollen nasal passages", "tearing skin", "teeth sensitivity", "teeth wobbling", "thickened skin", "thin hair strands", "throat spasms", "tingling scalp", "tingling sensation in toes", "tongue discoloration", 
       "tooth cracking", "tooth grinding", "trembling lips", "trembling tongue", "uncontrollable shaking", "uneven hair growth", "uneven nostrils", "unintentional humming", "unsteady hands", "upper back pain", "urinary urgency", "valley-like skin grooves", "vein inflammation", "vision fading", "vomiting foam", "vomiting undigested food", "water retention", "weak grip", "weight in chest", "white gums", "white nail beds", "whiteheads", "widened pupils", "wrist stiffness", 
    "yellow crust on wounds", "yellowish skin patches","abdominal muscle twitching", "abdominal wall rigidity", "abnormal finger curvature", "abnormal head size", "abnormal joint movement", "abnormal pigmentation", "abnormal sleep cycles", "abnormal tooth enamel", "absent muscle tone", "accumulated earwax", "acoustic sensitivity", "air hunger", "alkaline-tasting burps", "altered pain perception", "anal fissures", "ankle clicking", "anterior neck bulge", "apparent limb length discrepancy", "armpit pain", "articular swelling", "ashen skin", "asymmetric chest expansion", "auditory hallucinations", "aural fullness", "autoimmune flares", "axillary rashes", "back spasms", "ball-like skin nodules", "beaded hair", "belly button itching", "bent fingers", "bilateral arm weakness", "bilateral hand shaking", "bilateral leg pain", "black tongue", "bladder fullness sensation", "blisters around eyes", "bluish nails", "bluish sclera", "bone pain in ribs", "bone tenderness", "bony nodules on joints", "borderline hypotension", "bowed legs", "breakable skin", "breast bruising", "breast dimpling", "bright-colored skin", "bruises on knuckles", "bumpy scalp", "burning after sun exposure", "burning ears", "burning feet at night", "burning sensation in scalp", "calcified tissues", "calloused palms", "capillary fragility", "chapped nose", "chest creaking", "chest deformity", "chronic belching", "chronic eyelid twitching", "chronic eye redness", "chronic nosebleeds", "chronic swollen hands", "clogged hair follicles", "clouding of the cornea", "cold sores in nose", "colorless stools", "constant backache", "constant cheek biting", "contractures in joints", "cramping calf muscles", "cramping in eyelids", "crusting behind ears", "curled fingers", "curving of nails", "cyanotic lips", "dark circles under eyes", "darkened armpits", "deep voice changes", "delayed swallowing", "difficulty chewing hard foods", "difficulty moving tongue", "difficulty pushing with arms", "discolored sweat", "disconnected thoughts", "double-jointedness", "dry knuckles", "dry red patches on knuckles", "drooping hands", "earlobe creases", "early hearing loss", "elbow joint tightness", "enlarged ear lobes", "enlarged kneecaps",
    "enlarged nose tip", "enlarged pinky nail", "enlarged pores on nose", "enlarged wrists", "enlargement of tongue veins", "episodic leg buckling", "episodic limb paralysis", "episodic ringing in ears", "eroded teeth enamel", "erosions in mouth corners", "erythema of the face", "excessive eyebrow loss", "excessive lower back sweating", "excessive neck muscle tightness", "excessive oiliness in scalp", "excessive tongue coating", "excessive vaginal discharge", "extreme irritability", "eyeball pain on movement", "eyeball twitching", "eye drainage when blinking", "faint spots on nails", "fainting when laughing", "feeling bloated in neck", "femoral pain", "fibrous tissue on hands", "finger cracking sounds", "fingertip peeling", "fire-like pain in limbs", "fishy-smelling stools", "flat cheeks", "flat feet", "fluctuating hearing", "fluttering in abdomen", "fluttering vision", "focal eye pain", "forearm spasms", "freckled gums", "frequent ankle sprains", "frequent facial swelling", "frequent hiccup attacks", "frequent spasms under ribs", "frothy mucus in mouth", "frothy vomit", "frostbite scars", "full-body itching", "fungal patches on scalp", "furrowed nails", "gait instability", "gas pockets in abdomen", "glandular tenderness", "glassy eyes", "glossy skin patches", "gnawing abdominal sensation", "growing moles", "gummy cough", "hand bruising", "hand vein prominence", "hardening skin plaques", "heart flutters", "heaviness in eyelids", "hemorrhagic blisters", "hesitancy to start urinating", "hip flexor weakness", "hyperextension of joints", "hypersecretion of tears", "hypertension headaches", "hypersensitivity to vibrations", "hypoplastic toenails", "ice-pick-like headaches", "impaired taste perception", "impaired toe movements", "inability to grip tightly", "increased body temperature at night", "increased skin thickness", "indented chest wall", "inguinal pain", "involuntary head jerks", "involuntary leg lifts", "irregular tooth spacing", "irregular wrist veins", "itching after drinking alcohol", "itchy blisters on elbows", "itchy ears with discharge", "itchy nose tip", "itchy patches on neck", "jelly-like nasal discharge", "jerking hand movements", "joint freezing", "joint swelling with redness", "knee instability on stairs", "knobby finger joints", "knotted leg muscles", "lactation unrelated to pregnancy",
    "leathery patches on skin", "leg tingling during sleep", "lemon-yellow skin hue", "light flashes in peripheral vision", "limb throbbing", "liver tenderness", "localized foot pain", "loss of nose hair", "loss of pigmentation in patches", "loss of sweating in affected areas", "lower back muscle tightness", "lower belly cramping", "lower jaw clicking", "lower lip discoloration", "lumbar stiffness", "lumps in thighs", "lumps on back of tongue", "lumps under fingernails", "malaise after meals", "marble-like skin spots", "mask-like facial expressions", "melancholic episodes", "metallic breath", "migrating skin rash", "missing eyelashes", "monotone speech", "morning hoarseness", "mottled skin on legs", "mouth popping sounds", "mouth soreness without ulcers", "multiple swollen lymph nodes", "muscle clicking", "muscle dimpling", "muscle overgrowth", "nasal itchiness", "nasal scabs", "neck clicking with movement", "neck muscle ridges", "neck puffiness", "neon urine", "nipple crusting", "nodules on tendons", "nodules under arm skin", "noisy eating sounds", "nose deformity after injury", "nose itching when cold", "numbness around chin", "oily scalp with redness", "out-of-proportion head size", "overlapping fingers", "overlapping toes", "pain after bending knees", "pain behind shoulder blades", "pain in cheekbones", "pain when sitting long hours", "pale gums with sensitivity", "painless lumps in feet", "palate soreness", "parched tongue", "patches of hair with different textures", "patchy nail bed discoloration", "peculiar facial tics", "peeling earlobes", "pelvic muscle weakness", "persistently hoarse cry", "pinpoint skin lesions", "prickly foot pain", "prominent collarbones", "protruding belly muscles", "pulled ear sensation", "pupil size asymmetry", "quivering lower lip", "raised veins in fingers", "recurring blisters on toes", "recurring cracking knees", "recurring pelvic tightness", "red spots on tongue tip", "red streaks near ankles", "reduced sweating overall", "ring-shaped rashes on arms", "rough tongue texture", "rounded nail tips", "sagging facial skin", "scaly eyelids", "scarring alopecia",
    
   
  ];

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState('back');
  const [flashMode, setFlashMode] = useState('off');
  const [cameraReady, setCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [symptomSearch, setSymptomSearch] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!galleryStatus.granted) {
        Alert.alert('Sorry, we need camera roll permissions to work!');
      }
    })();
  }, []);

  if (permission === null) {
    return <Loading />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.linkText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      try {
        const video = await cameraRef.current.recordAsync();
      } catch (error) {
        console.error(error);
      } finally {
        setIsRecording(false);
      }
    }
  };
  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
   
  };
  const handleSymptomSelect = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      if (selectedSymptoms.length >= 20) {
        Alert.alert('Limit Reached', 'You can select up to 20 symptoms.');
        return;
      }
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setSymptomSearch('');
  };

  const handleSymptomRemove = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((item) => item !== symptom));
  };

  const filteredSymptoms = symptomsList.filter((symptom) =>
    symptom.toLowerCase().includes(symptomSearch.toLowerCase())
  );


  const toggleCameraFacing = () => {
    setType((current) => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlashMode((current) =>
      current === 'off' ? 'on' : current === 'on' ? 'auto' : 'off'
    );
  };

  return (
    <View style={styles.container}>

      <CameraView
        style={styles.camera}
        type={type}
        flashMode={flashMode}
        ref={cameraRef}
        ratio={'16:9'}
      >
        {/* Top Middle BlurView with Analyze Button */}
        <View style={styles.analyzeButtonContainer}>
          <BlurView intensity={50} tint="dark" style={styles.analyzeBlurView}>
            <TouchableOpacity style={styles.analyzeButton}>
              <Text style={styles.analyzeButtonText}>Analyze</Text>
            </TouchableOpacity>
          </BlurView>
        </View>

        {/* Display Selected Symptoms */}
        {selectedSymptoms.length > 0 && (
          <View style={styles.selectedSymptomsContainer}>
            <BlurView intensity={50} tint="dark" style={styles.symptomsBlurView}>
              <FlatList
                horizontal
                data={selectedSymptoms}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSymptomRemove(item)}
                    style={styles.symptomItem}
                  >
                    <Text style={styles.symptomText}>{item}</Text>
                    <AntDesign name="closecircle" size={16} color="white" />
                  </TouchableOpacity>
                )}
              />
            </BlurView>
          </View>
        )}

        {/* Symptoms Search BlurView */}
        <View style={styles.symptomSearchContainer}>
          <BlurView intensity={50} tint="dark" style={styles.searchBlurView}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Symptoms"
              placeholderTextColor="#ccc"
              value={symptomSearch}
              onChangeText={setSymptomSearch}
            />
          </BlurView>
          {/* Symptoms Suggestions */}
          {symptomSearch.length > 0 && (
            <View style={styles.suggestionsContainer}>
              <FlatList
                data={filteredSymptoms}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleSymptomSelect(item)}
                  >
                    <Text style={styles.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={[styles.captureButton, isRecording && styles.recordingButton]}
           onPress={takePicture} onPressIn={startRecording} onPressOut={stopRecording} />
        </View>

        <View style={styles.topNavContainer}>
          <BlurView intensity={50} tint="dark" style={styles.blurView}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setIsSidebarVisible(true)}>
              <Ionicons name="reorder-four-outline" size={24} color="white" />
            </TouchableOpacity>
          </BlurView>
        </View>

       <View style={styles.pickImageButtonContainer}>
          <BlurView intensity={50} tint="dark" style={styles.blurView}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleFlash}>
              <MaterialIcons
                name={flashMode === 'off' ? 'flash-off' : flashMode === 'on' ? 'flash-on' : 'flash-auto'}
                size={32}
                color="white"
              />
            </TouchableOpacity>
          </BlurView>
          <BlurView intensity={50} tint="dark" style={styles.blurView}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
              <Feather name="refresh-ccw" size={32} color="white" />
            </TouchableOpacity>
          </BlurView>
          <BlurView intensity={50} tint="dark" style={styles.blurView}>
            <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
              <AntDesign name="picture" size={32} color="white" />
            </TouchableOpacity>
          </BlurView>
        </View>
      
      </CameraView>
       {/* Sidebar */}
       {isSidebarVisible && (
        <SideBarHistory onClose={() => setIsSidebarVisible(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  promptButton: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 10,
    alignItems: 'center',
  },
  analyzeButtonContainer: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
  },
  analyzeBlurView: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  analyzeButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedSymptomsContainer: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
  },
  symptomsBlurView: {
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  symptomText: {
    color: 'white',
    fontSize: 14,
    marginRight: 5,
  },
  symptomSearchContainer: {
    position: 'absolute',
    bottom: 250,
    left: 20,
    width: '60%',
  },
  searchBlurView: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  searchInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 16,
  },
  suggestionsContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    marginTop: 5,
    maxHeight: 150,
  },
  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  suggestionText: {
    color: 'white',
    fontSize: 16,
  },
  promptText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 22,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  generateImageContainer: {
    position: 'absolute',
    bottom: 320, 
    left: '1%',
    transform: [{ translateX: 0 }],
    alignItems: 'center',
  },
  recordingButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'red',
  },
  topNavContainer: {
    position: 'absolute',
    top: 90,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 15,
    borderRadius: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pickImageButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  pickImageButton: {
    padding: 15,
    borderRadius: 30,
  },
  blurView: {
    borderRadius: 30,
    overflow: 'hidden',
    padding: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  linkText: {
    color: 'lightblue',
    textDecorationLine: 'underline',
  },
});
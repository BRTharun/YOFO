import os
import csv
import numpy as np
import tensorflow as tf
from PIL import Image
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from collections import Counter
import json

# Constants
IMAGE_SIZE = (200, 200)
CALORIES_PER_GRAM = {
    'Proteins': 4,
    'Carbohydrates': 4,
    'Fat': 9
}

foods_sorted = sorted(os.listdir('archive/Indian Food Images/Indian Food Images'))
# Load the trained model
tf.keras.backend.clear_session()
model_best = load_model('model_trained_102.hdf5')

# Load nutrition data globally
nutrition_table = {}
with open('food.csv', 'r') as file:
    reader = csv.reader(file)
    for i, row in enumerate(reader):
        if i == 0:
            continue
        name = row[0].strip()
        nutrition_table[name] = {
            'Calcium': float(row[2]),
            'Proteins': float(row[3]),
            'Carbohydrares': float(row[4]),
            'Fat': float(row[5])
        }

# Load 'finall' globally
finall = []  # Define finall globally
with open('food.csv', 'r') as file1:
    readerdata = csv.reader(file1)
    for row in readerdata:
        finall.append(row)

# Load Recommender data
df = pd.read_csv("dataset (1).csv")

dish_names = df['Name'].tolist()

class Recommender:
    def __init__(self, df):
        self.df = df
        self.model = self.train_model()

    def get_features(self):
        disease_dummies = self.df.Disease.str.get_dummies(sep=' ')
        veg = self.df.Veg_Non.str.get_dummies()
        feature_df = pd.concat([disease_dummies, veg], axis=1)
        return feature_df

    def train_model(self):
        feature_df = self.get_features()

        # Initializing model with k=40 neighbors
        model = NearestNeighbors(n_neighbors=40, algorithm='ball_tree')

        # Fitting model with dataset features
        model.fit(feature_df)

        return model

    def recommend(self, inputs):
        feature_df = self.get_features()

        # Getting distance and indices for k nearest neighbor
        distances, indices = self.model.kneighbors(inputs)

        df_results_list = [self.df.loc[i] for i in indices[0]]
        df_results = pd.concat(df_results_list)

        # Drop duplicates without specifying 'subset'
        df_results = df_results.drop_duplicates()

        df_results = df_results.reset_index(drop=True)

        return df_results

# Initialize the Recommender class
recommender = Recommender(df)

# Load the magic function data
model_load_path = "model_name.h5"

try:
    loaded_model = load_model(model_load_path)
except Exception as e:
    print(f"An error occurred: {str(e)}")

file_path = 'data.json'

with open(file_path, 'r') as json_file:
    loaded_data = json.load(json_file)

dict_of_word_embeddings = {key: np.array(value) for key, value in loaded_data.items()}

asana = [...]  # List of asanas

def predict_class(model, image_paths, foods_sorted):
    predictions = []
    for img_path in image_paths:
        img = image.load_img(img_path, target_size=IMAGE_SIZE)
        img = image.img_to_array(img)
        img = np.expand_dims(img, axis=0)
        img = img / 255.0
        pred = model.predict(img)
        index = np.argmax(pred)
        predictions.append(foods_sorted[index])
    return predictions

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_methods=["*"],
    allow_headers=["*"],
)

asana = ['padotthanasana', 'parvatasana', 'ardha titali asana', 'gatyatmak meru vakrasana', 'sideways viewing', 'makarasana', 'padmasana', 'vajrasana', 'ardha chandrasana', 'yogamudrasana', 'bhujangasana', 'saithalyasana', 'bhu namanasana', 'sarvangasana', 'natarajasana', 'poorna bhujangasana', 'koormasana', 'poorna shalabhasana', 'poorna dhanurasana', 'bandha hasta utthanasana ', 'shava udarakarshanasana ', 'chakki chalanasana ', 'kashtha takshanasana ', 'vayu nishkasana', 'ushtrasana', 'samakonasana ', 'matsyasana', 'kandharasana', ' setu asana ', 'paschimottanasana', 'meru akarshanasana', 'pada hastasana', 'seetkari pranayama', 'jalandhara bandha', 'tadagi mudra', 'maha vedha mudra', 'shashankasana', 'janu chakra', 'poorna titali asana', 'manibandha chakra', 'skandha chakra', 'greeva sanchalana', 'padachakrasana', 'pada sanchalanasana', 'supta pawanmuktasana', 'jhulana lurhakanasana', 'supta udarakarshanasana', 'naukasana', 'rajju karshanasana', 'nauka sanchalanasana', 'namaskarasana', 'kauva chalasana', 'palming', 'front and sideways viewing', 'up and down viewing', 'shavasana', 'advasana', 'ardha padmasana', 'siddhasana', 'siddha yoni asana', 'swastikasana', 'padadhirasana', 'ananda madirasana', 'bhadrasana', 'simhasana', 'simhagarjanasana', 'veerasana', 'marjari-asana', 'vyaghrasana', 'shashank bhujangasana', 'naman pranamasana', 'ashwa sanchalanasana', 'ardha ushtrasana', 'supta vajrasana', 'akarna dhanurasana', 'tadasana', 'tiryak tadasana', 'kati chakrasana', 'tiryak kati chakrasana', 'meru prishthasana', 'utthanasana', 'druta utkatasana', 'dwikonasana', 'trikonasana', 'utthita lolasana', 'dolasana', 'ashtanga namaskara', 'gupta padmasana', 'baddha padmasana', 'lolasana', 'kukkutasana', 'garbhasana', 'tolangulasana', 'saral bhujangasana', 'tiryak bhujangasana', 'sarpasana', 'ardha shalabhasana', 'shalabhasana', 'saral dhanurasana', 'dhanurasana', 'utthan pristhasana', 'gomukhasana', 'gatyatmak paschimottanasana', 'pada prasar paschimottanasana', 'janu sirshasana', 'ardha padma paschimottanasana', 'hasta pada angushthasana', 'padahastasana', 'sirsha angustha yogasana', 'utthita janu sirshasana', 'eka padottanasana', 'meru wakrasana', 'ardha matsyendrasana', 'parivritti janu sirshasana', 'bhumi pada mastakasana', 'moordhasana', 'padma sarvangasana', 'poorwa halasana', 'halasana', 'druta halasana', 'ardha padma halasana', ' stambhan asana ', ' sirshasana', ' salamba sirshasana', ' niralamba sirshasana', 'oordhwa padmasana', ' kapali asana', ' eka pada pranamasana', ' natavarasana', ' garudasana', ' tandavasana', ' saral natarajasana', ' natarajasana', ' eka padasana', ' bakasana', ' utthita hasta padangusthasana', ' merudandasana', ' niralamba paschimottanasana', ' ardha padma padottanasana', ' ardha baddha padmottanasana', ' vatayanasana', ' pada angushthasana', ' baka dhyanasana', ' eka pada baka dhyanasana', 'dwi hasta bhujasana', 'eka hasta bhujasana', ' hamsasana', ' santolanasana', ' vashishthasana', ' koormasana', ' poorna shalabhasana', ' poorna dhanurasana', ' dhanurakarshanasana', ' prishthasana', ' parighasana', ' chakrasana', ' hanumanasana', ' brahmacharyasana', ' grivasana', ' sirshapada bhumi sparshasana', ' poorna matsyendrasana', ' mayurasana', ' padma mayurasana', ' moolabandhasana', ' gorakshasana', ' astavakrasana', ' vrischikasana', ' eka pada sirasana', ' utthan eka pada sirasana', ' dwi pada sirasana', ' dwi pada kandharasana', ' padma parvatasana', 'vishwamitrasana', 'sukhanasana', 'vakrasana', 'bakasana', 'sirshasana', 'upavistha konasana', 'hasta utthanasana', 'paschimottanasana ', 'kapalabhati pranayama', 'taadasana', 'ardha matsyendrasan', 'balasana ', 'phalakasana', 'setu bandha ', 'ustrasana', 'natrajasana ', 'surya namaskar', 'bhairavasana', 'hanumanasana', 'virabhadrasana', 'camatkarasana', 'vrikshasana', 'tri pada adho mukha svanasana', 'dandasana', 'purvottanasana', 'bharmanasana', 'pawanmuktasana', 'ashta chandrasana', 'salabhasana', 'utkatasana', 'anjenayasana', 'kraunchasana', 'svastikasana', 'sucirandhrasana', 'supta trivikramasana', 'anantasna', 'jathara parivartanasana', 'bananasana', 'mayurasna', 'rajakapotasana', 'bharadvajasana', 'parighasana', 'bhekasana', 'kurmasana', 'supta padangusthasana a straps', 'ardha kapotasana', 'utkata konasana', 'sahaja navasana', 'skandasana', 'anuvittasana', 'bitilasana ', 'karnapidasana', 'sama vritti', 'prasarita padottanasana', 'yoganidrasana', 'marichyasana', 'virasana', 'koundinyasana', 'mandukasana', 'simhasana ', 'sitali', 'murcha pranayama', 'hamsasana', 'katichakrasana', 'gorakshasana', 'pasasana ', 'kakimudra', 'kumbhakasana', 'makarasan', 'malasana', 'marjariasan', 'matsya kridasana', 'padangusthasana', 'parivritta parsvakonasana', 'pincha mayurasana', 'pranamasana', 'shasankasana', 'supta udarakarshanasan', 'tolungulasana', 'utthan prishthasana', 'vasisthasana', 'vipareet karni asana', 'vrishchikasana', 'mudrasana', 'bhujapidasana', 'garudasana', 'kapotasan', 'muktasana', 'parshvakonasana', 'prasarita padottasana', 'samakonasana', 'tittibhasana', 'tulasana', 'upavistha titli asana', 'uttana shishoasana', 'agnistambhasana', 'mrigi mudra', 'abhaya hridiya mudra', 'viparita shalabhasana', 'gandha bherudasana', 'karandavasana', 'dwi pada sirsasana', 'swarga dwijasana', 'ashwathasana', 'yastikasana', 'nataprathanasana', 'chakki chalanasana', 'talasana', 'padma mudra', 'brahmandasana', 'jala neti ( shatkarma )', 'sheetkrama kapalbhati', 'vastra dhauti', 'trataka', 'somachandrasana', 'gherandasana ', 'kapilasana', 'omkarasana', 'kashyapawsana', 'bhunamanasana', 'mandalasana']

def magic(user_input_words):
    print(user_input_words)
    predicted_asanas = []
    final_predicted_asanas = []
  
    for i in user_input_words:
        print(i)
        if i in dict_of_word_embeddings:
            print("dfjklsdj")
            input_array = np.expand_dims(dict_of_word_embeddings[i], axis=0)
            prediction = loaded_model.predict(input_array)
            flatten_pred = prediction.flatten()
            result_indices = flatten_pred.argsort()[-10:][::-1]
            print(f"Us: {result_indices}")
    
            for result in result_indices:
                predicted_asanas.append(asana[result])
    
    
    counter_found = Counter(predicted_asanas)
    final_predicted_asanas_with_freq = counter_found.most_common(7)
  # print(final_predicted_asanas_with_freq)

    for yoga, freq in final_predicted_asanas_with_freq:
        final_predicted_asanas.append(yoga)
    
    if final_predicted_asanas==[]:
        final_predicted_asanas=["Tadasana", "Adho Mukha Svanasana", "Balasana", "Virabhadrasana II", "Savasana"]
    return final_predicted_asanas


@app.post("/food-predict/")
async def predict_quantity(image_path: str, quantity: int):
    try:
        print("Received image_path:", image_path)
        print("Received quantity:", quantity)
        predictions = predict_class(model_best, [image_path], foods_sorted)
        if not predictions:
            raise HTTPException(status_code=400, detail="Failed to predict food.")
        prediction = predictions[0]

        nutrient_info = nutrition_table.get(prediction, {})

        protein = nutrient_info.get('Proteins', 0) * quantity / 100
        carbohydrates = nutrient_info.get('Carbohydrares', 0) * quantity / 100
        fat = nutrient_info.get('Fat', 0) * quantity / 100
        total_calories = sum(
            nutrient_info.get(nutrient, 0) * quantity / 100 * CALORIES_PER_GRAM.get(nutrient, 0)
            for nutrient in CALORIES_PER_GRAM.keys()
        )

        rasa = finall[13][7]
        guna = finall[13][8]
        virya = finall[13][9]

        return {
            "Prediction": prediction,
            "Quantity": quantity,
            "Protein (g)": protein,
            "Carbohydrates (g)": carbohydrates,
            "Fat (g)": fat,
            "Total_Calories": total_calories,
            "Rasa": rasa,
            "Guna": guna,
            "Virya": virya
        }
    except Exception as e:
        print("Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/recipe-recommend/')
async def recommend_endpoint(request: Request):
    try:
        data = await request.json()

        # Retrieve individual parameters: disease1, disease2, veg
        disease1 = data.get('disease1', '')
        disease2 = data.get('disease2', '')
        veg = data.get('veg', '')

        # Create a list of features based on user input
        input_features = [disease1, disease2, veg]

        # Make sure the input features match the ones in your dataset
        total_features = recommender.get_features().columns
        d = {feature: 0 for feature in total_features}

        for i in input_features:
            if i in d:
                d[i] = 1

        final_input = list(d.values())

        # Remove any extra features if needed
        if len(final_input) > len(total_features):
            final_input = final_input[:len(total_features)]

        # Get recommendations using the trained model
        results = recommender.recommend([final_input])[:120]

        recommended_recipes = []
        for _, row in results.to_frame().iterrows():
            # Cast int64 values to int
            row = row.apply(lambda x: int(x) if isinstance(x, np.int64) else x)
            recommended_recipes.append(row.to_dict())

        # Select the desired indexes (2, 12, 22, 32, 42, 52, 62, 72, 82, 92)
        selected_indexes = [1, 13, 23, 31, 41, 51, 61, 71, 81, 91]
        recommended = []

        for i in range(len(recommended_recipes)):
            if i < len(results):
                x = recommended_recipes[i]
                y = x.get(0)
                recommended.append(y)

        common_elements = list(set(recommended).intersection(dish_names))

        return {'recommended_recipes': common_elements}
    except Exception as e:
        return {'error': str(e)}

@app.post('/asana-predict/')
async def predict(request: Request):
    data = await request.json()

    if 'user_input_words' not in data:
        return {'error': 'Missing user_input_words field'}, 400

    user_input_words = data['user_input_words']

    result = magic(user_input_words)

    return {'predicted_asanas': result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

import requests
from bs4 import BeautifulSoup
import json

# Extended keywords dictionary to include both English and French
domain_keywords = {
    'Software Development': ['software', 'developer', 'engineer', 'programmer', 'développeur', 'ingénieur', 'programmeur'],
    'Data Science': ['data', 'scientist', 'analyst', 'machine learning', 'données', 'scientifique', 'analyste', 'apprentissage automatique'],
    'Marketing': ['marketing', 'advertising', 'SEO', 'publicité', 'référencement'],
    'Finance': ['finance', 'financial', 'accounting', 'investment', 'banking', 'financier', 'comptabilité', 'investissement', 'banque'],
    'Human Resources': ['HR', 'human resources', 'recruitment', 'talent', 'ressources humaines', 'recrutement', 'talent'],
    'Design': ['design', 'graphic', 'UX', 'UI', 'graphique'],
    'Sales': ['sales', 'business development', 'account manager', 'ventes', 'développement commercial', 'gestionnaire de compte'],
    'Customer Service': ['customer service', 'support', 'client', 'service client', 'assistance'],
    'Education': ['education', 'teacher', 'instructor', 'professor', 'éducation', 'enseignant', 'instructeur', 'professeur'],
    'Healthcare': ['healthcare', 'medical', 'nurse', 'doctor', 'santé', 'médical', 'infirmier', 'docteur'],
    'Logistics': ['logistics', 'supply chain', 'warehouse', 'transport', 'logistique', 'chaîne dapprovisionnement', 'entrepôt', 'transport'],
    'Legal': ['legal', 'lawyer', 'paralegal', 'jurist', 'juridique', 'avocat', 'parajuriste'],
    'Engineering': ['engineering', 'engineer', 'civil', 'mechanical', 'electrical', 'ingénierie', 'génie civil', 'génie mécanique', 'génie électrique'],
    'Consulting': ['consulting', 'consultant', 'conseil'],
    'Real Estate': ['real estate', 'property', 'estate agent', 'immobilier', 'propriété', 'agent immobilier'],
    'Hospitality': ['hospitality', 'hotel', 'restaurant', 'tourism', 'hôtel', 'restaurant', 'tourisme'],
    'Retail': ['retail', 'store', 'merchandising', 'retail manager', 'commerce de détail', 'magasin', 'merchandising', 'directeur de magasin'],
    'Pharmaceutical': ['pharmaceutical', 'pharma', 'drug', 'biotech', 'pharmaceutique', 'médicament', 'biotechnologie'],
    'Media': ['media', 'journalism', 'editor', 'journalisme', 'éditeur'],
    'Automotive': ['automotive', 'car', 'vehicle', 'automobile', 'voiture', 'véhicule'],
    'Aerospace': ['aerospace', 'aviation', 'aeronautics', 'space', 'aérospatiale', 'aviation', 'aéronautique', 'espace'],
    'IT': ['IT', 'information technology', 'tech', 'technologie de information'],
    'Telecommunications': ['telecommunications', 'telecom', 'network', 'télécommunications', 'réseau'],
    'Insurance': ['insurance', 'assurance', 'actuary', 'underwriter', 'actuariat', 'souscripteur'],
    'Government': ['government', 'public sector', 'civil service', 'gouvernement', 'secteur public', 'fonction publique']
    # Add more domains and keywords as needed
}

def categorize_job(title):
    for domain, keywords in domain_keywords.items():
        if any(keyword.lower() in title.lower() for keyword in keywords):
            return domain
    return 'Other'

# Extract from stagiaires.ma
def extract_stagiaires(page):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'}
    url = f'https://www.stagiaires.ma/offres-stages/{page}'
    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.content, 'html.parser')
    return soup

def transform_stagiaires(soup):
    job_list = []
    divs = soup.find_all('div', class_='offer-container')
    for item in divs:
        title_tag = item.find('a')
        title = item.find('strong').text.strip() if title_tag else 'No title available'
        href = title_tag['href'].strip() if title_tag else 'No link available'
        description = item.find('p').text.strip() if title_tag else 'No description available'
        company_tag = item.find('div', class_='actions').find('small', class_='text-muted')
        company_location = company_tag.text.strip() if company_tag else 'No company available - No location available'
        
        if '-' in company_location:
            company, location = map(str.strip, company_location.split('-', 1))
        else:
            company, location = company_location, 'No location available'
        
        date_tag = item.find('small', attrs={'title': 'Date début de stage'})
        datef = date_tag.text.strip() if date_tag else 'No date available'
        paid = False
        duration = 'No duration available'
        type = 'No type available'

        # Extract additional fields based on class names
        for span in item.find_all('span', class_='btn'):
            span_classes = span['class']
            if 'btn-warning' in span_classes:
                paid = True
            if 'btn-danger' in span_classes:
                duration = span.text.strip()
            if 'btn-primary' in span_classes:
                intertype = span.text.strip()
        # Categorize the job based on the title
        domain = categorize_job(title)

        job = {
            'title': title,
            'company': company,
            'location': location,
            'description': description,
            'date': datef,
            'link': href,
            'domain': domain,
            'paid': paid,
            'duration': duration,
            'type': intertype,
            
        }
        job_list.append(job)

    return job_list

# Loop through pages and extract data from stagiaires.ma
all_job_data = []

for page in range(1, 40):
    print(f'Extracting page {page} from stagiaires.ma...')
    stagiaires_soup = extract_stagiaires(page)
    stagiaires_job_data = transform_stagiaires(stagiaires_soup)
    all_job_data.extend(stagiaires_job_data)

# Print the job data to inspect it
print(json.dumps(all_job_data, indent=2))

# Send data to Laravel API
api_url = 'http://127.0.0.1:8000/api/internships'
headers = {'Content-Type': 'application/json'}

try:
    response = requests.post(api_url, json=all_job_data, headers=headers)
    response.raise_for_status()  # Raise an error for bad responses (4xx or 5xx)
    print('Data sent successfully to Laravel API!')
except requests.exceptions.RequestException as e:
    print(f'Error sending data to Laravel API: {e}')

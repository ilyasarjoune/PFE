import requests
from bs4 import BeautifulSoup
import json

def extract(page):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    }
    url = f'https://www.linkedin.com/jobs/search?keywords=Stage&location=Morocco&geoId=102787409&trk=public_jobs_jobs-search-bar_search-submit&position=2&pageNum={page}&currentJobId=3954128721'
    r = requests.get(url, headers=headers)
    
    soup = BeautifulSoup(r.content, 'html.parser')
    return soup

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

def transform(soup):
    job_list = []
    divs = soup.find_all('div', class_='base-card')
    for item in divs:
        title_tag = item.find('a')
        title = title_tag.text.strip() if title_tag else 'No title available'
        href = title_tag['href'].strip() if title_tag else 'No link available'
        company_tag = item.find('h4', class_='base-search-card__subtitle')
        company = company_tag.text.strip() if company_tag else 'No company available'
        location_tag = item.find('span', class_='job-search-card__location')
        location = location_tag.text.strip() if location_tag else 'No location available'
        date_tag = item.find('time', class_='job-search-card__listdate')
        datef = date_tag.text.strip() if date_tag else 'No date available'

        # Categorize the job based on the title
        domain = categorize_job(title)

        job = {
            'title': title,
            'company': company,
            'location': location,
            'date': datef,
            'link': href,
            'domain': domain
        }
        job_list.append(job)

    return job_list

# Extract data
c = extract(0)
job_data = transform(c)

# Print the job data to inspect it
print(json.dumps(job_data, indent=2))

# Send data to Laravel API
api_url = 'http://127.0.0.1:8000/api/internships'
headers = {'Content-Type': 'application/json'}

try:
    response = requests.post(api_url, json=job_data, headers=headers)
    response.raise_for_status()  # Raise an error for bad responses (4xx or 5xx)
    print('Data sent successfully to Laravel API!')
except requests.exceptions.RequestException as e:
    print(f'Error sending data to Laravel API: {e}')

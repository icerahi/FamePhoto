# Django React Startup Application

# To start
```
git clone https://github.com/icerahi/django_react_boilerplate.git

cd <project_directory>
rm -rf .git # Delete all git information
git init # Recreate an empty repo
git add --all # Re-add all the files to the index
git commit -m 'Initialize project'
```

# Django
```


cd backend
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

# React
```
cd frontend
npm i
npm run build
```
Run Application
```
python manage.py runserver
```

;/ Kysa laga?

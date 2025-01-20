from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.cvRoutes import router as upload_cv_router

app = FastAPI()

# cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_cv_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the CV upload and processing API!"}
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from utils.uploadR2 import upload_to_r2
from utils.updateExcel import update_excel
from utils.processCV import parsingCV
from utils.getExcelData import get_excel_data
@app.get('/public-data')
async def get_details():
    try:
        # Get all data from Excel using the utility function
        data = get_excel_data()

        return JSONResponse(content={"data": data})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

using Abp.Authorization;
using emes.Authorization;
using emes.BaseComponents;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;

namespace emes.Services.MasterData.MaterialMasterData
{
    [AbpAuthorize(PermissionNames.Pages_Material, PermissionNames.Pages_MasterData)]
    public class MaterialMasterDataAppService : AsyncCrudAppService<MaterialMasterDataModel, MaterialMasterDataDto, Guid, PagedMaterialMasterDataResultRequsetDto, MaterialMasterDataCreateDto, MaterialMasterDataUpdateDto>, IMaterialMasterDataAppService
    {
        private readonly IRepository<MaterialMasterDataModel, Guid> _repository;
        private readonly IRepository<MaterialTypeModel, Guid> _MTrepository;
        private readonly IRepository<MaterialGroupModel, Guid> _MaterialGroupModel;
        private readonly IRepository<MaterialStatusModel, Guid> _MSrepository;
        private readonly IRepository<OrganizationUnit, long> _OrganizationUnit;
        private readonly UserManager _userManager;
        private readonly IAbpSession _abpSession;
        public MaterialMasterDataAppService(
            IRepository<MaterialMasterDataModel, Guid> repository,
            IRepository<MaterialTypeModel, Guid> MTrepository,
            IRepository<MaterialStatusModel, Guid> MSrepository,
            IRepository<MaterialGroupModel, Guid> MaterialGroupModel,
            IRepository<OrganizationUnit, long> OrganizationUnit,
            UserManager userManager,
            IAbpSession abpSession
            ) : base(repository)
        {
            _repository = repository;
            _MTrepository = MTrepository;
            _MSrepository = MSrepository;
            _abpSession = abpSession;
            _userManager = userManager;
            _OrganizationUnit = OrganizationUnit;
            _MaterialGroupModel = MaterialGroupModel;

        }
        protected virtual async Task<MaterialStatusModel> GetMaterialStatus(Guid id)
        {
            var MStatus = await _MSrepository.GetAll().Where(x => x.Id == id).FirstOrDefaultAsync();
            return MStatus;
        }
        public override async Task<MaterialMasterDataDto> CreateAsync(MaterialMasterDataCreateDto input)
        {
            try
            {
                var OuName = await _OrganizationUnit.GetAll().Where(x => x.DisplayName == "Admin" && x.TenantId == AbpSession.TenantId.Value).FirstOrDefaultAsync();
                var MType = await _MTrepository.FirstOrDefaultAsync(x => x.MaterialTypes == input.MaterialType);
                var MStatus = await _MSrepository.FirstOrDefaultAsync(x => x.MaterialStatus == input.MaterialStatus);
                var MGroup = await _MaterialGroupModel.FirstOrDefaultAsync(x => x.materialGroup == input.MaterialGroup);
                var masterExited = await _repository.GetAll().Where(x => x.MaterialNumber == input.MaterialNumber).FirstOrDefaultAsync();
                if (masterExited == null)
                {
                    if (MType != null && MStatus != null)
                    {
                        var result = ObjectMapper.Map<MaterialMasterDataModel>(input);
                        result.materialStatus = MStatus;
                        result.OrganizationUnitId = OuName.Id;
                        result.MaterialType = MType;
                        result.MaterialGroup = MGroup;
                        result.TenantId = AbpSession.TenantId.Value;
                        await _repository.InsertAsync(result);
                        return MapToEntityDto(result);
                    }
                    throw new EntityNotFoundException("MaterialType or MaterialStatus không tồn tại");
                }
                else
                {
                    throw new EntityNotFoundException($"masterNumber đã tồn tại {input.MaterialNumber}");

                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        public override async Task<MaterialMasterDataDto> UpdateAsync(MaterialMasterDataUpdateDto input)
        {
            try
            {
                var MType = await _MTrepository.FirstOrDefaultAsync(x => x.MaterialTypes == input.MaterialType);
                var MStatus = await _MSrepository.FirstOrDefaultAsync(x => x.MaterialStatus == input.MaterialStatus);
                var MGroup = await _MaterialGroupModel.FirstOrDefaultAsync(x => x.materialGroup == input.MaterialGroup);
                var master = await _repository.GetAll().Where(x => x.Id == input.Id).FirstOrDefaultAsync();
                if (MType != null && MStatus != null)
                {
                    master.materialStatus = MStatus;
                    master.MaterialType = MType;
                    master.MaterialGroup = MGroup;
                    master.TenantId = AbpSession.TenantId.Value;
                    MapToEntity(input, master);
                    return await GetAsync(input);
                }
                throw new EntityNotFoundException("MaterialType or MaterialStatus không tồn tại");
            }
            catch (Exception)
            {

                throw;
            }
        }


        //protected override IQueryable<MaterialMasterDataModel> CreateFilteredQuery(PagedMaterialMasterDataResultRequsetDto input)
        //{

        //    var query = Repository.GetAll().Where(x => x.OrganizationUnitId == input.OrganizationUnitId);

        //    if (!input.Keyword.IsNullOrWhiteSpace())
        //    {
        //        query = query.Where(x => x.MaterialNumber.Contains(input.Keyword.Trim()));
        //    }

        //    return query;
        //}

        protected override IQueryable<MaterialMasterDataModel> ApplySorting(IQueryable<MaterialMasterDataModel> query, PagedMaterialMasterDataResultRequsetDto input)
        {
            return query.OrderBy(r => r.MaterialNumber);
        }

        protected override MaterialMasterDataDto MapToEntityDto(MaterialMasterDataModel entity)
        {
            var status = _MSrepository.GetAll().Where(x => x.Id == entity.materialStatusId).FirstOrDefault();
            var type = _MTrepository.GetAll().Where(x => x.Id == entity.MaterialTypeId).FirstOrDefault();
            var group = _MaterialGroupModel.GetAll().Where(x => x.Id == entity.MaterialGroupId).FirstOrDefault();
            var Dto = base.MapToEntityDto(entity);
            Dto.MaterialType = type?.MaterialTypes;
            Dto.destype = type?.Description;
            Dto.MaterialStatus = status?.MaterialStatus;
            Dto.desStatus = status?.Description;
            Dto.MaterialGroup = group?.materialGroup;
            Dto.desGroup = group?.Description;
            return Dto;
        }


        protected override MaterialMasterDataModel MapToEntity(MaterialMasterDataCreateDto createInput)
        {
            return base.MapToEntity(createInput);
        }


        protected override void MapToEntity(MaterialMasterDataUpdateDto updateInput, MaterialMasterDataModel entity)
        {
            base.MapToEntity(updateInput, entity);

        }

        public async Task ExportExcel()
        {

            try
            {
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                ExcelPackage ExcelPkg = new ExcelPackage();
                ExcelWorksheet wsSheet1 = ExcelPkg.Workbook.Worksheets.Add("Sheet1");
                ExcelRange Rng = wsSheet1.Cells[2, 1, 2, 9];
                Rng.Value = "Reporting Material Master data";
                Rng.Style.Font.Size = 16;
                Rng.Merge = true;
                Rng.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                Rng.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                Rng.Style.Fill.PatternType = ExcelFillStyle.Solid;
                Rng.Style.Fill.BackgroundColor.SetColor(Color.Yellow);
                Rng.Style.Font.Color.SetColor(Color.Red);
                Rng.Style.Font.Bold = true;
                Rng.Style.Font.Italic = true;

                ExcelRange trans = wsSheet1.Cells[3, 1];
                trans.Value = " Number";
                trans.Style.Font.Size = 10;
                trans.Style.WrapText = true;
                trans.AutoFitColumns();

                //ExcelRange type = wsSheet1.Cells[3, 2].Value = "Type";

                wsSheet1.Cells[3, 3].Value = "Group";
                wsSheet1.Cells[3, 4].Value = "Quantiry";
                wsSheet1.Cells[3, 5].Value = "material Lot";
                wsSheet1.Cells[3, 6].Value = "material Number";
                wsSheet1.Cells[3, 7].Value = "from Plant";
                wsSheet1.Cells[3, 8].Value = "from Sub Location";
                wsSheet1.Cells[3, 9].Value = "docment Type";
                wsSheet1.Cells[3, 9].Value = "isCompleted";

                wsSheet1.Protection.IsProtected = false;
                wsSheet1.Protection.AllowSelectLockedCells = false;
                string p_strPath = "D:\\New.xlsx";
                if (File.Exists(p_strPath))
                {
                    File.Delete(p_strPath);
                }
                FileStream obj = File.Create(p_strPath);
                obj.Close();
                File.WriteAllBytes(p_strPath, ExcelPkg.GetAsByteArray());
                ExcelPkg.Dispose();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task ImportExcel(IFormFile file , MaterialMasterDataCreateDto createInput)
        {
            try
            {
                var stream = file.OpenReadStream();
                var package = new ExcelPackage(stream);
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                var worksheet = package.Workbook.Worksheets.FirstOrDefault();
                if (worksheet == null)
                {
                    throw new EntityNotFoundException("file excel rong vui lòng kiểm tra lại");
                }
                else
                {
                    string[] header = BComponent.ReadColumnDataFromExcel(file, 7);
                    if (
                           header[0] != "materialNumber" &&
                           header[1] != "description" &&
                           header[2] != " materialGroup" &&
                           header[3] != "primaryUom" &&
                           header[4] != "secondaryUom" &&
                           header[5] != "Type" &&
                           header[6] != "status")
                    {
                        throw new EntityNotFoundException("Form không đúng định dạng vui lòng tải lại Form có sẵn");
                    }
                    var rowCount = worksheet.Dimension.End.Row;
                    for (int row = 2; row <= rowCount; row++)
                    {
                        var MType = await _MTrepository.FirstOrDefaultAsync(x => x.MaterialTypes == worksheet.Cells[row, 6].Value.ToString().Trim());
                        var MStatus = await _MSrepository.FirstOrDefaultAsync(x => x.MaterialStatus == int.Parse(worksheet.Cells[row, 7].Value.ToString().Trim()));
                        if (MType != null && MStatus != null)
                        {

                            var MMD = new MaterialMasterDataModel
                            {
                                MaterialType = MType,
                                materialStatus = MStatus,
                                MaterialNumber = worksheet.Cells[row, 1].Value.ToString().Trim(),
                                Description = worksheet.Cells[row, 2].Value.ToString().Trim(),
                                //MaterialGroup = Guid.Parse(worksheet.Cells[row, 3].Value.ToString().Trim()),
                                PrimaryUom = worksheet.Cells[row, 4].Value.ToString().Trim(),
                                SecondaryUom = worksheet.Cells[row, 5].Value.ToString().Trim(),
                                TenantId = AbpSession.TenantId.Value,

                            };

                            await _repository.InsertAsync(MMD);
                        }
                    }

                }
            }
            catch (Exception)
            {
                throw;
            }
        }


    }
}

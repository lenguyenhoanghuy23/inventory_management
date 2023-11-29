
using Abp.Domain.Entities;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;

using System.Linq;


namespace emes.BaseComponents;

public class BComponent
{
  

    public static string[] ReadColumnDataFromExcel(IFormFile file, int tolCol)
    {
        var stream = file.OpenReadStream();
        var package = new ExcelPackage(stream);
        ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
        var worksheet = package.Workbook.Worksheets.FirstOrDefault();
        var colCount = worksheet.Dimension.End.Column;
        if (colCount < tolCol || colCount > tolCol)
        {
            throw new EntityNotFoundException("số lượng cột đang thiếu hoặc quá dư vui lòng kiểm tra lại");
        }
        string[] header = new string[colCount];
        for (int col = 1; col <= colCount; col++)
        {
            header[col - 1] = worksheet.Cells[1, col].Value.ToString();
        }
        return header;
    }
}
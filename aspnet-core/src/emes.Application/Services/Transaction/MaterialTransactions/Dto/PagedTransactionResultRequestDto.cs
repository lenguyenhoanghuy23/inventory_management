
namespace emes.Services.Transaction.MaterialTransactions.Dto
{
    public class PagedTransactionResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public long? OrganizationUnitId { get; set; }
        public bool? IsActive { get; set; }

    }
}

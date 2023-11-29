



namespace emes.Services.Transaction.TransactionsTypes.Dto
{
    public class PagedTransactionsTypeResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}

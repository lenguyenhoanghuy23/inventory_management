using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using emes.Authorization.Roles;
using emes.Authorization.Users;
using emes.MultiTenancy;
using emes.Models.Material;
using emes.Models.Transactions;

namespace emes.EntityFrameworkCore
{
    public class emesDbContext : AbpZeroDbContext<Tenant, Role, User, emesDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<MaterialMasterDataModel> materialMasterDataModels { get; set; }
        public DbSet<MaterialStatusModel> materialStatusModels { get; set; }
        public DbSet<MaterialTypeModel> materialTypeModels { get; set; }
        public DbSet<MaterialAssignmentModel> materialAssignmentModels { get; set; }
        public DbSet<MaterialGroupModel> materialGroupModels { get; set; }

        // -----------transaction----------------//
        public DbSet<MaterialTransactionsTypesModel> materialTransactionsTypesModels { get; set; }
       
        public DbSet<MaterialTransactionsModel> materialTransactionsModels { get; set; }

        // ------------GoodReceipts--------------//
        public DbSet<GoodReceiptsModel> goodReceiptsModels { get; set; }

        // ------------GoodIssues--------------//
        public DbSet<GoodIssuesModel>goodIssuesModels { get; set; }

        public DbSet<MaterialPlantModel> materialPlantModels { get; set; }

        // ----------- inventory----------------//
        public DbSet<MaterialInventoryModel> materialInventoriesModels { get; set; }

        public emesDbContext(DbContextOptions<emesDbContext> options)
            : base(options)
        {
        }
    }
}

using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace emes.EntityFrameworkCore
{
    public static class emesDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<emesDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<emesDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}

import TenantService from '../../../services/tenantService'
import getUserContext from '../../utils/getUserContext'
import ReportService from '../../../services/reportService'

export default async () => {
  const tenants = await TenantService._findAndCountAllForEveryUser({})

  // for each tenant
  for (const tenant of tenants.rows) {
    const userContext = await getUserContext(tenant.id)
    const rs = new ReportService(userContext)

    console.log(`Creating members report for tenant ${tenant.id}`)
    await rs.create({
      name: 'Members report',
      public: false,
      isTemplate: true,
    })
  }
}

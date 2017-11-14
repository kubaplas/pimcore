<?php
/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @category   Pimcore
 * @package    Object
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

namespace Pimcore\Model\DataObject\ImportResolver;

use Pimcore\Model\DataObject\Concrete;

class Id
{
    /**
     * @var
     */
    protected $config;

    /**
     * @var
     */
    protected $idIdx;

    /**
     * Id constructor.
     */
    public function __construct($config)
    {
        $this->config = $config;
        $this->idIdx = $this->config->resolverSettings->column;
    }

    /**
     * @param $parentId
     * @param $rowData
     * @return static
     * @throws \Exception
     */
    public function resolve($parentId, $rowData)
    {
        if (!is_null($this->idIdx)) {
            $id = $rowData[$this->idIdx];

            $object = Concrete::getById($id);
            if (!$object) {
                throw new \Exception("Could not resolve object with id " . $id);
            }

            $parent = $object->getParent();
            if (!$parent->isAllowed('create')) {
                throw new \Exception("no permission to overwrite object with id " . $id);
            }
            return $object;
        }
    }
}
